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
    console.log("catch", {
        ...cursor
    });
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
    console.warn(node);
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
    console.warn("??", {
        ...this
    });
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
    console.warn("!!", {
        ...node
    });
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

function ast2js(cursor) {
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.children[0]} + ${this.children[1]}`, cursor);
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
    //TODO None type...
    //TODO str
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.children[0]} == ${this.children[1]}`, cursor);
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
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.==", "bool", null, [
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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akIxQixNQUFJO1FBQ1IsTUFBTTRCLE9BQU8sSUFBSSxDQUFDdkIsSUFBSSxDQUFDd0IsUUFBUSxDQUFDLElBQUksQ0FBQ0osR0FBRyxDQUFDLEVBQUMsa0JBQWtCO1FBRTVELElBQUksSUFBSUYsSUFBSSxHQUFHQSxJQUFJSyxLQUFLQyxRQUFRLENBQUNaLE1BQU0sRUFBRSxFQUFFTSxFQUFHO1lBQzFDdkIsTUFBTVksK0NBQU9BLENBQUMsSUFBSSxDQUFDUCxJQUFJLEVBQUVILFFBQVE7WUFDakNGLE1BQU1PLGtEQUFVQSxDQUFDcUIsS0FBS0MsUUFBUSxDQUFDTixFQUFFLEVBQUVyQjtZQUNuQ0YsTUFBTVcsNENBQUlBLENBQUMsS0FBS1Q7UUFDcEI7UUFFQSxJQUFHLElBQUksQ0FBQ3dCLGFBQWEsRUFBRTtZQUNuQjFCLE1BQU1ZLCtDQUFPQSxDQUFDLElBQUksQ0FBQ1AsSUFBSSxFQUFFSDtZQUN6QkYsTUFBTTtZQUNORSxPQUFPRSxHQUFHLElBQUk7UUFDbEI7UUFFQXdCLEtBQUtFLE1BQU0sR0FBRztZQUNWSCxPQUFPQTtZQUNQSSxLQUFPO2dCQUFDLEdBQUc3QixNQUFNO1lBQUE7UUFDckI7UUFFQSxPQUFPRjtJQUNYO0FBQ0o7Ozs7Ozs7U0M1Q0E7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONkM7QUFDYjtBQUNvQjtBQUNQO0FBRStDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jbGFzcy9jbGFzc2RlZi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NsYXNzL2NsYXNzZGVmL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbW1lbnRzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29tbWVudHMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2Zvci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9mb3IvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaGJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2NhdGNoYmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy90cnlibG9jay90cnkvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy93aGlsZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy93aGlsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9jYWxsL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9kZWYvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvZGVmL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2Fzc2VydC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2Fzc2VydC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9hc3NlcnQvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL2ltcG9ydC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9rZXl3b3Jkcy9yYWlzZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvTm9uZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvYm9vbC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mLXN0cmluZy9Gb3JtYXR0ZWRWYWx1ZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Ytc3RyaW5nL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZi1zdHJpbmcvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9mbG9hdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9pbnQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy8qL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLyovYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLysvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvKy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvLS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy8tL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz09L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz09L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9EaXYvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvRGl2L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9GbG9vckRpdi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9GbG9vckRpdi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvW10vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvW10vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2F0dHIvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXR0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvcGFzcy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9yZXR1cm4vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy9kaWN0L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zdHJ1Y3RzL3R1cGxlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvc3RydWN0cy90dXBsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL0V4Y2VwdGlvbnMvSlNFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdF9mYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9BU1ROb2RlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQm9keS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTVCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5pbXBvcnQgeyBCb2R5IH0gZnJvbSBcInN0cnVjdHMvQm9keVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXN0MmpzKGFzdDogQVNUKSB7XG5cbiAgICBjb25zdCBleHBvcnRlZCA9IFtdOyAvLyBtb3ZlMmFzdCBnZW4gP1xuXG5cdGxldCBqcyA9IGAvLyMgc291cmNlVVJMPSR7YXN0LmZpbGVuYW1lfVxcbmA7XG5cdCAgICBqcys9IGBjb25zdCB7X3JfLCBfYl99ID0gX19TQlJZVEhPTl9fO1xcbmA7XG4gICAgbGV0IGN1cnNvciA9IHtsaW5lOiAzLCBjb2w6IDB9O1xuXHRmb3IobGV0IG5vZGUgb2YgYXN0Lm5vZGVzKSB7XG5cblx0XHRqcyArPSBhc3Rub2RlMmpzKG5vZGUsIGN1cnNvcik7XG5cbiAgICAgICAgaWYobm9kZS50eXBlID09PSBcImZ1bmN0aW9ucy5kZWZcIilcbiAgICAgICAgICAgIGV4cG9ydGVkLnB1c2gobm9kZS52YWx1ZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCI7XCIsIGN1cnNvcilcblxuICAgICAgICBqcyArPSAgICBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gYFxcbmNvbnN0IF9fZXhwb3J0ZWRfXyA9IHske2V4cG9ydGVkLmpvaW4oJywgJyl9fTtcXG5gO1xuXG5cdHJldHVybiBqcztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcihzdHI6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5hcmdzOmFueVtdKSB7XG4gICAgcmV0dXJuIFtzdHIsIGFyZ3NdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9KUyggc3RyOiBSZXR1cm5UeXBlPHR5cGVvZiByPnxzdHJpbmd8QVNUTm9kZXxCb2R5LFxuICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogQ29kZVBvcyApIHtcblxuICAgIGlmKCB0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gc3RyLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICBpZiggc3RyIGluc3RhbmNlb2YgQm9keSApIHtcbiAgICAgICAgcmV0dXJuIHN0ci50b0pTKGN1cnNvcik7XG4gICAgfVxuXG4gICAgaWYoIHN0ciBpbnN0YW5jZW9mIEFTVE5vZGVcbiAgICAgICAgfHwgc3RyIGluc3RhbmNlb2YgT2JqZWN0ICYmICEgQXJyYXkuaXNBcnJheShzdHIpICkgeyAvLyBmb3IgcHkyYXN0X2Zhc3RcbiAgICAgICAgcmV0dXJuIGFzdG5vZGUyanMoc3RyLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGxldCBqcyA9IFwiXCI7XG5cbiAgICBsZXQgZTogYW55O1xuICAgIGxldCBzOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHN0clsxXS5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIHMgPSBzdHJbMF1baV07XG4gICAgICAgIGpzICs9IHM7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gcy5sZW5ndGg7XG5cbiAgICAgICAgZSA9IHN0clsxXVtpXTtcbiAgICAgICAgaWYoIGUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgIGpzICs9IHRvSlMoZSwgY3Vyc29yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMgPSBgJHtlfWA7XG4gICAgICAgICAgICBqcyArPSBzO1xuICAgICAgICAgICAgY3Vyc29yLmNvbCArPSBzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHMgPSBzdHJbMF1bc3RyWzFdLmxlbmd0aF07XG4gICAganMgKz0gcztcbiAgICBjdXJzb3IuY29sICs9IHMubGVuZ3RoO1xuXG4gICAgcmV0dXJuIGpzO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBib2R5MmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcywgaWR4ID0gMCwgcHJpbnRfYnJhY2tldCA9IHRydWUpIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgbGV0IGpzID0gXCJcIjtcbiAgICBpZihwcmludF9icmFja2V0KVxuICAgICAgICBqcys9XCJ7XCI7XG4gICAgY29uc3QgYm9keSA9IG5vZGUuY2hpbGRyZW5baWR4XTsvL2JvZHk6IEFTVE5vZGVbXTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBib2R5LmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGpzICs9IG5ld2xpbmUobm9kZSwgY3Vyc29yLCAxKTtcbiAgICAgICAganMgKz0gYXN0bm9kZTJqcyhib2R5LmNoaWxkcmVuW2ldLCBjdXJzb3IpXG4gICAgfVxuXG4gICAgaWYocHJpbnRfYnJhY2tldCkge1xuICAgICAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IFwifVwiO1xuICAgICAgICBjdXJzb3IuY29sICs9IDE7XG4gICAgfVxuXG4gICAgYm9keS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBhcmdzMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBcIihcIjtcbiAgICBjdXJzb3IuY29sICs9IDE7XG5cbiAgICBjb25zdCBhcmdzID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwIDsgaSA8IGFyZ3MuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApIHtcbiAgICAgICAgICAgIGpzICs9IFwiLFwiO1xuICAgICAgICAgICAgKytjdXJzb3IuY29sO1xuICAgICAgICB9XG5cbiAgICAgICAganMgKz0gYXJnMmpzKGFyZ3MuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAganMgKz0gXCIpXCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgYXJncy5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJnMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGNvbnN0IHN0YXJ0ID0gey4uLmN1cnNvcn07XG5cbiAgICBsZXQganMgPSBub2RlLnZhbHVlO1xuICAgIGN1cnNvci5jb2wgKz0ganMubGVuZ3RoO1xuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kICA6IHsuLi5jdXJzb3J9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3bGluZShub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGluZGVudF9sZXZlbDogbnVtYmVyID0gMCkge1xuXG4gICAgbGV0IGJhc2VfaW5kZW50ID0gbm9kZS5qc2NvZGUhLnN0YXJ0LmNvbDtcbiAgICBpZiggW1wiY29udHJvbGZsb3dzLmVsc2VcIiwgXCJjb250cm9sZmxvd3MuZWxpZlwiLCBcImNvbnRyb2xmbG93cy5jYXRjaGJsb2NrXCJdLmluY2x1ZGVzKG5vZGUudHlwZSkgKSB7XG4gICAgICAgLS1iYXNlX2luZGVudDtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRlbnQgPSBpbmRlbnRfbGV2ZWwqNCArIGJhc2VfaW5kZW50O1xuXG4gICAgKytjdXJzb3IubGluZTtcbiAgICBjdXJzb3IuY29sID0gaW5kZW50O1xuICAgIHJldHVybiBcIlxcblwiICsgXCJcIi5wYWRTdGFydChpbmRlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXN0bm9kZTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIG5vZGUuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogey4uLmN1cnNvcn0sXG4gICAgICAgIGVuZCAgOiBudWxsIGFzIGFueVxuICAgIH1cblxuICAgIGxldCBqcyA9IG5vZGUudG9KUyEoY3Vyc29yKTtcblxuICAgIG5vZGUuanNjb2RlLmVuZCA9IHsuLi5jdXJzb3J9XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IHsgQm9keSB9IGZyb20gXCJzdHJ1Y3RzL0JvZHlcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGJhc2U6IHN0cmluZ3xBU1ROb2RlID0gXCJfcl8ub2JqZWN0XCI7XG4gICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAyKVxuICAgICAgICBiYXNlID0gdGhpcy5jaGlsZHJlblswXTtcblxuICAgIHJldHVybiB0b0pTKHJgY2xhc3MgJHt0aGlzLnZhbHVlfSBleHRlbmRzICR7YmFzZX0gJHtuZXcgQm9keSh0aGlzKX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW25vZGUubmFtZV0gPSAnY2xhc3MuJyArIG5vZGUubmFtZTtcblxuICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dChcImNsYXNzXCIsIGNvbnRleHQpO1xuXG4gICAgaWYoIG5vZGUuYmFzZXMubGVuZ3RoID4gMSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcblxuICAgIGxldCBjaGlsZHJlbiA9IG5vZGUuYmFzZXMubGVuZ3RoID09PSAxID9cbiAgICAgICAgICBbY29udmVydF9ub2RlKG5vZGUuYmFzZXNbMF0sIGNvbnRleHQpLCBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dCldXG4gICAgICAgIDogW2NvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KV07XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjbGFzcy5jbGFzc2RlZlwiLCBudWxsLCBub2RlLm5hbWUsIGNoaWxkcmVuKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNsYXNzRGVmXCI7IiwiaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIF9jdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIC8vVE9ETy4uLlxuICAgIHJldHVybiBcIlwiOyAvL2Ake3RoaXMudmFsdWV9YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybjsgLy8gY3VycmVudGx5IGNvbW1lbnRzIGFyZW4ndCBpbmNsdWRlZCBpbiBCcnl0aG9uJ3MgQVNUXG5cbiAgICAvL2NvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmJvb2xcIiwgbm9kZS52YWx1ZSk7XG4gICAgLy9hc3Rub2RlLnJlc3VsdF90eXBlID0gXCJib29sXCI7XG4gICAgLy9yZXR1cm4gYXN0bm9kZTtcbn0iLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZm9yKHJhbmdlKVwiKSB7XG5cbiAgICAgICAgbGV0IGJlZyA6IHN0cmluZ3xBU1ROb2RlICA9IFwiMG5cIjtcbiAgICAgICAgbGV0IGluY3I6IHN0cmluZ3xBU1ROb2RlID0gXCIxblwiO1xuICAgICAgICBsZXQgZW5kICA9IHRoaXMuY2hpbGRyZW5bMF07XG5cbiAgICAgICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgYmVnID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIGVuZCA9IHRoaXMuY2hpbGRyZW5bMV07XG4gICAgICAgIH1cbiAgICAgICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMylcbiAgICAgICAgICAgIGluY3IgPSB0aGlzLmNoaWxkcmVuWzJdO1xuXG4gICAgICAgIGxldCBqcyA9IHRvSlMocmBmb3IodmFyICR7dGhpcy52YWx1ZX0gPSAke2JlZ307ICR7dGhpcy52YWx1ZX0gPCAke2VuZH07ICR7dGhpcy52YWx1ZX0gKz0gJHtpbmNyfSlgLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgdGhpcy5jaGlsZHJlbi5sZW5ndGgtMSk7XG5cbiAgICAgICAgcmV0dXJuIGpzO1xuICAgIH1cblxuICAgIGxldCBqcyA9IHRvSlMocmBmb3IodmFyICR7dGhpcy52YWx1ZX0gb2YgdGhpcy5jaGlsZHJlblswXSlgLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gbm9kZS50YXJnZXQuaWQ7XG4gICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbdGFyZ2V0XSA9IG51bGw7IC8vVE9ET1xuXG4gICAgaWYoIG5vZGUuaXRlci5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJDYWxsXCIgJiYgbm9kZS5pdGVyLmZ1bmMuaWQgPT09IFwicmFuZ2VcIikge1xuXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICAgICAgLi4uIG5vZGUuaXRlci5hcmdzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKSxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcblxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3JcIiwgbnVsbCwgdGFyZ2V0LCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLml0ZXIsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZvclwiOyIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5pZmJsb2NrXCIpIHtcbiAgICAgICAgbGV0IGpzID0gXCJcIjtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICAvL2lmXG4gICAgbGV0IGtleXdvcmQgPSBcImlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxpZlwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlIGlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxzZVwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlXCI7XG5cbiAgICBsZXQganMgPSB0b0pTKGtleXdvcmQsIGN1cnNvcik7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgaWYoIGtleXdvcmQgIT09IFwiZWxzZVwiKSB7IC8vIGlmL2VsaWYgY29uZGl0aW9uLlxuICAgICAgICBvZmZzZXQgPSAxO1xuICAgICAgICBqcyArPSB0b0pTKHJgKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgb2Zmc2V0KTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlLCBsaXN0cG9zIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCBcImlmYmxvY2tcIiBpbiBub2RlICkge1xuXG4gICAgICAgIGlmKCBub2RlLmlmYmxvY2sgPT09IFwiZWxzZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy4ke25vZGUuaWZibG9ja31gLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbmQgPSBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNvbmQucmVzdWx0X3R5cGUgIT09IFwiYm9vbFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUeXBlICR7Y29uZC5yZXN1bHRfdHlwZX0gbm90IHlldCBzdXBwb3J0ZWQgYXMgaWYgY29uZGl0aW9uYCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIGBjb250cm9sZmxvd3MuJHtub2RlLmlmYmxvY2t9YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgY29uZCxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBub2RlLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgbm9kZS5pZmJsb2NrID0gXCJpZlwiO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIG5vZGVcbiAgICBdO1xuXG4gICAgbGV0IGN1ciA9IG5vZGU7XG4gICAgd2hpbGUoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoID09PSAxICYmIFwidGVzdFwiIGluIGN1ci5vcmVsc2VbMF0pIHtcbiAgICAgICAgY3VyID0gY3VyLm9yZWxzZVswXTtcbiAgICAgICAgY3VyLnNicnl0aG9uX3R5cGUgPSBcIklmXCI7XG4gICAgICAgIGN1ci5pZmJsb2NrID0gXCJlbGlmXCI7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY3VyKTtcbiAgICB9XG4gICAgaWYoIFwib3JlbHNlXCIgaW4gY3VyICYmIGN1ci5vcmVsc2UubGVuZ3RoICE9PSAwICkgeyAvLyBlbHNlXG5cbiAgICAgICAgY2hpbGRyZW4ucHVzaCh7XG4gICAgICAgICAgICBzYnJ5dGhvbl90eXBlOiBcIklmXCIsXG4gICAgICAgICAgICBpZmJsb2NrOiBcImVsc2VcIixcbiAgICAgICAgICAgIGJvZHkgICA6IGN1ci5vcmVsc2UsXG4gICAgICAgICAgICAuLi5saXN0cG9zKGN1ci5vcmVsc2UpLFxuICAgICAgICAgICAgLy8gYmVjYXVzZSByZWFzb25zLi4uXG4gICAgICAgICAgICBsaW5lbm8gICAgOiBjdXIub3JlbHNlWzBdLmxpbmVubyAtIDEsXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmNvbF9vZmZzZXQsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgYXN0bm9kZSA9IG5ldyBBU1ROb2RlKG5vZGUsIFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgLi4uY2hpbGRyZW4ubWFwKCBuID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgICAgIF0pO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3Rub2RlLmNoaWxkcmVuLmxlbmd0aC0xOyArK2kpIHtcbiAgICAgICAgY29uc3QgY2MgPSBhc3Rub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuO1xuICAgICAgICBhc3Rub2RlLmNoaWxkcmVuW2ldLnB5Y29kZS5lbmQgPSBjY1tjYy5sZW5ndGgtMV0ucHljb2RlLmVuZDtcbiAgICB9XG5cbiAgICByZXR1cm4gYXN0bm9kZTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIklmXCI7IiwiaW1wb3J0IHsgYm9keTJqcywgbmV3bGluZSwgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSwgbGlzdHBvcyB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgc2JyeXRob25fdHlwZTogXCJUcnkudHJ5XCIsXG4gICAgICAgICAgICAuLi5ub2RlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNicnl0aG9uX3R5cGU6IFwiVHJ5LmNhdGNoYmxvY2tcIixcbiAgICAgICAgICAgIC4uLmxpc3Rwb3Mobm9kZS5oYW5kbGVycyksXG4gICAgICAgICAgICBoYW5kbGVyczogbm9kZS5oYW5kbGVyc1xuICAgICAgICB9XG4gICAgXTtcblxuICAgIGNvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy50cnlibG9ja1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIC4uLmNoaWxkcmVuLm1hcCggbiA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgIF0pO1xuXG4gICAgLy9maXggcHljb2RlLlxuICAgIGFzdG5vZGUuY2hpbGRyZW5bMF0ucHljb2RlLmVuZCA9IGFzdG5vZGUuY2hpbGRyZW5bMV0ucHljb2RlLnN0YXJ0O1xuXG4gICAgcmV0dXJuIGFzdG5vZGU7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnlcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhyYGlmKF9lcnJfIGluc3RhbmNlb2YgJHt0aGlzLmNoaWxkcmVuWzBdfSl7YCwgY3Vyc29yKTtcbiAgICAgICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzKz0gYGxldCAke3RoaXMudmFsdWV9ID0gX2Vycl87YDtcbiAgICAgICAganMrPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSwgZmFsc2UpO1xuICAgICAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yKTtcbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLmNhdGNoYCwgbnVsbCwgbm9kZS5uYW1lLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnR5cGUsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkV4Y2VwdEhhbmRsZXJcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgY29uc29sZS5sb2coXCJjYXRjaFwiLCB7Li4uY3Vyc29yfSk7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiY2F0Y2goX3Jhd19lcnJfKXtcIiwgY3Vyc29yKTtcbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICBqcys9IHRvSlMoXCJjb25zdCBfZXJyXyA9IF9yYXdfZXJyXyBpbnN0YW5jZW9mIF9iXy5QeXRob25FcnJvclwiLCBjdXJzb3IpO1xuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDQpO1xuICAgIGpzKz0gdG9KUyhcIj8gX3Jhd19lcnJfLnB5dGhvbl9leGNlcHRpb25cIiwgY3Vyc29yKTtcbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCA0KTtcbiAgICBqcys9IHRvSlMoXCI6IG5ldyBfcl8uSlNFeGNlcHRpb24oX3Jhd19lcnJfKTtcIiwgY3Vyc29yKTtcbiAgICAgICAgLy8gZGVidWdcbiAgICAgICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzICs9IHRvSlMoXCJfYl8uZGVidWdfcHJpbnRfZXhjZXB0aW9uKF9lcnJfLCBfX1NCUllUSE9OX18pXCIsIGN1cnNvcik7XG4gICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG5cbiAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICBmb3IobGV0IGhhbmRsZXIgb2YgdGhpcy5jaGlsZHJlbilcbiAgICAgICAganMrPSB0b0pTKGhhbmRsZXIsIGN1cnNvcik7XG5cbiAgICBqcys9IHRvSlMoXCJlbHNleyB0aHJvdyBfcmF3X2Vycl8gfVwiLCBjdXJzb3IpOyAvL1RPRE8uLi5cblxuICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDApO1xuICAgIGpzKz0gdG9KUyhcIn1cIiwgY3Vyc29yKTtcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy5jYXRjaGJsb2NrYCwgbnVsbCwgbnVsbCxcbiAgICAgICAgbm9kZS5oYW5kbGVycy5tYXAoIChoOmFueSkgPT4gY29udmVydF9ub2RlKGgsIGNvbnRleHQpKVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnkuY2F0Y2hibG9ja1wiOyIsImltcG9ydCBQeV9FeGNlcHRpb24gZnJvbSBcImNvcmVfcnVudGltZS9FeGNlcHRpb25zL0V4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQVNUIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgU0JyeXRob24gfSBmcm9tIFwicnVudGltZVwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZnVuY3Rpb24gZmlsdGVyX3N0YWNrKHN0YWNrOiBzdHJpbmdbXSkge1xuICByZXR1cm4gc3RhY2suZmlsdGVyKCBlID0+IGUuaW5jbHVkZXMoJ2JyeXRob25fJykgKTsgLy9UT0RPIGltcHJvdmVzLi4uXG59XG5cblxuZnVuY3Rpb24gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhub2RlczogQVNUTm9kZVtdLCBsaW5lOiBudW1iZXIsIGNvbDogbnVtYmVyKTogbnVsbHxBU1ROb2RlIHtcblxuICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyArK2kpIHtcblxuICAgICAgaWYoIG5vZGVzW2ldLmpzY29kZSEuc3RhcnQubGluZSA+IGxpbmVcbiAgICAgIHx8IG5vZGVzW2ldLmpzY29kZSEuc3RhcnQubGluZSA9PT0gbGluZSAmJiBub2Rlc1tpXS5qc2NvZGUhLnN0YXJ0LmNvbCA+IGNvbClcbiAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgaWYoICAgIG5vZGVzW2ldLmpzY29kZSEuZW5kLmxpbmUgPiBsaW5lXG4gICAgICAgICAgfHwgbm9kZXNbaV0uanNjb2RlIS5lbmQubGluZSA9PT0gbGluZSAmJiBub2Rlc1tpXS5qc2NvZGUhLmVuZC5jb2wgPiBjb2xcbiAgICAgICkge1xuICAgICAgICAgIGxldCBub2RlID0gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhub2Rlc1tpXS5jaGlsZHJlbiwgbGluZSwgY29sKTtcbiAgICAgICAgICBpZiggbm9kZSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgcmV0dXJuIG5vZGVzW2ldO1xuICAgICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7IC8vdGhyb3cgbmV3IEVycm9yKFwibm9kZSBub3QgZm91bmRcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFja2xpbmUyYXN0bm9kZShzdGFja2xpbmU6IFN0YWNrTGluZSwgc2I6IFNCcnl0aG9uKTogQVNUTm9kZSB7XG4gIGNvbnN0IGFzdCA9IHNiLmdldEFTVEZvcihcInNicnl0aG9uX2VkaXRvci5qc1wiKTtcbiAgcmV0dXJuIGZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MoYXN0Lm5vZGVzLCBzdGFja2xpbmVbMV0sIHN0YWNrbGluZVsyXSkhO1xufVxuXG5leHBvcnQgdHlwZSBTdGFja0xpbmUgPSBbc3RyaW5nLCBudW1iZXIsIG51bWJlcl07XG5cbi8vVE9ETzogY29udmVydFxuZXhwb3J0IGZ1bmN0aW9uIHN0YWNrMmFzdG5vZGVzKHN0YWNrOiBTdGFja0xpbmVbXSwgc2I6IFNCcnl0aG9uKTogQVNUTm9kZVtdIHtcbiAgcmV0dXJuIHN0YWNrLm1hcCggZSA9PiBzdGFja2xpbmUyYXN0bm9kZShlLCBzYikgKTtcbn1cblxuLy9UT0RPOiBhZGQgZmlsZS4uLlxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlX3N0YWNrKHN0YWNrOiBhbnksIHNiOiBTQnJ5dGhvbik6IFN0YWNrTGluZVtdIHtcblxuXG4gIFxuICAgIHN0YWNrID0gc3RhY2suc3BsaXQoXCJcXG5cIik7XG5cbiAgICBjb25zdCBpc1Y4ID0gc3RhY2tbMF09PT0gXCJFcnJvclwiOyBcblxuICAgIHJldHVybiBmaWx0ZXJfc3RhY2soc3RhY2spLm1hcCggbCA9PiB7XG5cbiAgICAgIGxldCBbXywgX2xpbmUsIF9jb2xdID0gbC5zcGxpdCgnOicpO1xuICBcbiAgICAgIGlmKCBfY29sW19jb2wubGVuZ3RoLTFdID09PSAnKScpIC8vIFY4XG4gICAgICAgIF9jb2wgPSBfY29sLnNsaWNlKDAsLTEpO1xuICBcbiAgICAgIGxldCBsaW5lID0gK19saW5lIC0gMjtcbiAgICAgIGxldCBjb2wgID0gK19jb2w7XG5cbiAgICAgIC0tY29sOyAvL3N0YXJ0cyBhdCAxLlxuXG4gICAgICBsZXQgZmN0X25hbWUhOiBzdHJpbmc7XG4gICAgICBpZiggaXNWOCApIHtcbiAgICAgICAgbGV0IHBvcyA9IF8uaW5kZXhPZihcIiBcIiwgNyk7XG4gICAgICAgIGZjdF9uYW1lID0gXy5zbGljZSg3LCBwb3MpO1xuICAgICAgICBpZiggZmN0X25hbWUgPT09IFwiZXZhbFwiKSAvL1RPRE86IGJldHRlclxuICAgICAgICAgIGZjdF9uYW1lID0gXCI8bW9kdWxlPlwiO1xuXG4gICAgICAgIC8vVE9ETzogZXh0cmFjdCBmaWxlbmFtZS5cbiAgICAgICAgY29uc3QgYXN0ID0gc2IuZ2V0QVNURm9yKFwic2JyeXRob25fZWRpdG9yLmpzXCIpO1xuICAgICAgICBjb25zdCBub2RlID0gZmluZF9hc3Rub2RlX2Zyb21fanNjb2RlX3Bvcyhhc3Qubm9kZXMsIGxpbmUsIGNvbCkhO1xuICAgICAgICBpZihub2RlLnR5cGUgPT09IFwic3ltYm9sXCIpXG4gICAgICAgICAgY29sICs9IG5vZGUudmFsdWUubGVuZ3RoOyAvLyBWOCBnaXZlcyBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIHN5bWJvbCBuYW1lIHdoZW4gRkYgZ2l2ZXMgXCIoXCIuLi5cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHBvcyA9IF8uaW5kZXhPZignQCcpO1xuICAgICAgICBmY3RfbmFtZSA9IF8uc2xpY2UoMCwgcG9zKTtcbiAgICAgICAgaWYoIGZjdF9uYW1lID09PSBcImFub255bW91c1wiKSAvL1RPRE86IGJldHRlclxuICAgICAgICAgIGZjdF9uYW1lID0gXCI8bW9kdWxlPlwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW2ZjdF9uYW1lLCBsaW5lLCBjb2xdIGFzIGNvbnN0O1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkZWJ1Z19wcmludF9leGNlcHRpb24oZXJyOiBQeV9FeGNlcHRpb24sIHNiOiBTQnJ5dGhvbikge1xuXG4gICAgY29uc29sZS53YXJuKFwiRXhjZXB0aW9uXCIsIGVycik7XG5cbiAgICBjb25zdCBzdGFjayA9IHBhcnNlX3N0YWNrKCAoZXJyIGFzIGFueSkuX3Jhd19lcnJfLnN0YWNrLCBzYik7XG4gICAgY29uc3Qgbm9kZXMgPSBzdGFjazJhc3Rub2RlcyhzdGFjaywgc2IpO1xuICAgIC8vVE9ETzogY29udmVydCBzdGFjay4uLlxuICAgIGNvbnN0IHN0YWNrX3N0ciA9IHN0YWNrLm1hcCggKGwsaSkgPT4gYEZpbGUgXCJbZmlsZV1cIiwgbGluZSAke25vZGVzW2ldLnB5Y29kZS5zdGFydC5saW5lfSwgaW4gJHtzdGFja1tpXVswXX1gKTtcblxuICAgIGxldCBleGNlcHRpb25fc3RyID0gXG5gVHJhY2ViYWNrIChtb3N0IHJlY2VudCBjYWxsIGxhc3QpOlxuICAke3N0YWNrX3N0ci5qb2luKGBcXG4gIGApfVxuRXhjZXB0aW9uOiBbbXNnXWA7XG5cbiAgICBjb25zb2xlLmxvZyhleGNlcHRpb25fc3RyKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRlYnVnX3ByaW50X2V4Y2VwdGlvblxufTsiLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcbmltcG9ydCB7IEJvZHkgfSBmcm9tIFwic3RydWN0cy9Cb2R5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGNvbnN0IGJvZHkgPSBuZXcgQm9keSh0aGlzKTtcblxuICAgIHJldHVybiB0b0pTKHJgdHJ5JHtib2R5fWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy50cnlgLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiVHJ5LnRyeVwiOyIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKHJgd2hpbGUoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xuICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCAxKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbGluZSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy53aGlsZVwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIldoaWxlXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgaWYoIHRoaXMuY2hpbGRyZW5bMF0ucmVzdWx0X3R5cGU/LnN0YXJ0c1dpdGgoXCJjbGFzcy5cIikgKVxuICAgICAgICBqcys9IHRvSlMoXCJuZXcgXCIsIGN1cnNvcik7XG4gICAgXG4gICAganMgKz0gdG9KUyhyYCR7dGhpcy5jaGlsZHJlblswXX0oYCwgY3Vyc29yKTtcblxuICAgIC8vVE9ETzogYXJncyBub2RlLi4uXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBpZiggaSAhPT0gMSlcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCIsIFwiLCBjdXJzb3IpO1xuICAgICAgICBcbiAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGpzICs9IHRvSlMoXCIpXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIC8vIFRPRE86IG5vZGUuYXJncyAvLyBmY3QgY2FsbCBhcmd1bWVudC5cbiAgICAvLyBUT0RPOiB0aGlzID9cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJmdW5jdGlvbnMuY2FsbFwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmZ1bmMsIGNvbnRleHQgKSxcbiAgICAgICAgLi4ubm9kZS5hcmdzLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSwgY29udGV4dCkgKVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ2FsbFwiOyIsImltcG9ydCB7IGFyZ3MyanMsIGJvZHkyanMsIG5ld2xpbmUsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSAnJztcbiAgICBpZiggISB0aGlzLnR5cGUuZW5kc1dpdGgoXCIobWV0aClcIikgKVxuICAgICAgICBqcyArPSB0b0pTKCdmdW5jdGlvbiAnLCBjdXJzb3IpO1xuICAgIGpzICs9IHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcblxuICAgIGpzICs9IGFyZ3MyanModGhpcywgY3Vyc29yKTtcbiAgICBqcyArPSB0b0pTKFwie1wiLCBjdXJzb3IpO1xuICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCAxLCBmYWxzZSk7XG5cbiAgICBjb25zdCBib2R5ID0gdGhpcy5jaGlsZHJlblsxXS5jaGlsZHJlbjtcbiAgICBpZiggYm9keVtib2R5Lmxlbmd0aCAtIDFdLnR5cGUgIT09IFwia2V5d29yZHMucmV0dXJuXCIgKSB7XG4gICAgICAgIGpzICs9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICAgICAganMgKz0gXCJyZXR1cm4gbnVsbDtcIlxuICAgIH1cblxuICAgIGpzICs9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAwKSArIHRvSlMoXCJ9XCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9hcmdzLCBjb252ZXJ0X2JvZHksIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBhcmdzID0gY29udmVydF9hcmdzKG5vZGUsIGNvbnRleHQpO1xuXG4gICAgY29uc3QgaXNNZXRob2QgPSBjb250ZXh0LnR5cGUgPT09IFwiY2xhc3NcIjsgIFxuXG4gICAgY29udGV4dCA9IG5ldyBDb250ZXh0KFwiZmN0XCIsIGNvbnRleHQpO1xuICAgIC8vIG5ldyBjb250ZXh0IGZvciB0aGUgZnVuY3Rpb24gbG9jYWwgdmFyaWFibGVzXG4gICAgY29udGV4dCA9IHtcbiAgICAgICAgLi4uY29udGV4dFxuICAgIH1cbiAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlcyA9IHsuLi5jb250ZXh0LmxvY2FsX3ZhcmlhYmxlc307XG4gICAgZm9yKGxldCBhcmcgb2YgYXJncy5jaGlsZHJlbilcbiAgICAgICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbYXJnLnZhbHVlXSA9IGFyZy5yZXN1bHRfdHlwZTtcblxuICAgIC8vIHJldHVybiB0eXBlLi4uIG5vZGUucmV0dXJucy5pZFxuXG4gICAgbGV0IHR5cGUgPSBcImZ1bmN0aW9ucy5kZWZcIjtcbiAgICBpZihpc01ldGhvZClcbiAgICAgICAgdHlwZSArPSBcIihtZXRoKVwiO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIHR5cGUsIG51bGwsIG5vZGUubmFtZSwgW1xuICAgICAgICBhcmdzLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZ1bmN0aW9uRGVmXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgX2JfLmFzc2VydCgke3RoaXMuY2hpbGRyZW5bMF19KWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnNvbGUud2Fybihub2RlKTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIkFzc2VydFwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJBc3NlcnRcIjsiLCJmdW5jdGlvbiBhc3NlcnQoY29uZDogYm9vbGVhbikge1xuICAgIGlmKCBjb25kIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdBc3NlcnRpb24gZmFpbGVkJyk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFzc2VydFxufTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMudmFsdWVbMV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRvSlModGhpcy52YWx1ZVswXSwgY3Vyc29yKTtcblxuICAgIHJldHVybiB0b0pTKGAke3RoaXMudmFsdWVbMF19OiAke3RoaXMudmFsdWVbMV19YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMuaW1wb3J0LmFsaWFzXCIsIG51bGwsIFtub2RlLm5hbWUsIG5vZGUuYXNuYW1lXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiYWxpYXNcIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IFwiXCI7XG5cbiAgICBqcyArPSB0b0pTKFwiY29uc3Qge1wiLCBjdXJzb3IpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKCBpICE9PSAwKVxuICAgICAgICAgICAganMgKz0gdG9KUyhcIiwgXCIsIGN1cnNvciApO1xuICAgICAgICBqcyArPSB0b0pTKCB0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IgKTtcbiAgICB9XG4gICAganMgKz0gdG9KUyhcIn0gPSBcIiwgY3Vyc29yKTtcbiAgICBcbiAgICBpZih0aGlzLnZhbHVlID09PSBudWxsKVxuICAgICAgICBqcyArPSB0b0pTKFwiX19TQlJZVEhPTl9fLmdldE1vZHVsZXMoKVwiLCBjdXJzb3IpO1xuICAgIGVsc2VcbiAgICAgICAganMgKz0gdG9KUyhgX19TQlJZVEhPTl9fLmdldE1vZHVsZShcIiR7dGhpcy52YWx1ZX1cIilgLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJrZXl3b3Jkcy5pbXBvcnRcIiwgbnVsbCwgbm9kZS5tb2R1bGUsXG4gICAgICAgIG5vZGUubmFtZXMubWFwKCAobjphbnkpID0+IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0KSApXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJJbXBvcnRcIiwgXCJJbXBvcnRGcm9tXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYHRocm93IG5ldyBfYl8uUHl0aG9uRXJyb3IoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLnJhaXNlXCIsIG51bGwsIG51bGwsIFtcbiAgICAgICAgY29udmVydF9ub2RlKG5vZGUuZXhjLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUmFpc2VcIjsiLCJleHBvcnQgY2xhc3MgUHl0aG9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cbiAgICByZWFkb25seSBweXRob25fZXhjZXB0aW9uOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihweXRob25fZXhjZXB0aW9uOiBhbnkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgcHl0aG9uX2V4Y2VwdGlvbi5fcmF3X2Vycl8gPSB0aGlzO1xuICAgICAgICB0aGlzLnB5dGhvbl9leGNlcHRpb24gPSBweXRob25fZXhjZXB0aW9uO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgUHl0aG9uRXJyb3Jcbn07IiwiaW1wb3J0IEFTVF9DT05WRVJUXzAgZnJvbSBcIi4vc3ltYm9sL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18wIGZyb20gXCIuL3N5bWJvbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xIGZyb20gXCIuL3N0cnVjdHMvdHVwbGUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEgZnJvbSBcIi4vc3RydWN0cy90dXBsZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yIGZyb20gXCIuL3N0cnVjdHMvbGlzdC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMiBmcm9tIFwiLi9zdHJ1Y3RzL2xpc3QvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMyBmcm9tIFwiLi9zdHJ1Y3RzL2RpY3QvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMgZnJvbSBcIi4vc3RydWN0cy9kaWN0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzQgZnJvbSBcIi4vcmV0dXJuL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU180IGZyb20gXCIuL3JldHVybi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF81IGZyb20gXCIuL3Bhc3MvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzUgZnJvbSBcIi4vcGFzcy9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF82IGZyb20gXCIuL29wZXJhdG9ycy9hdHRyL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU182IGZyb20gXCIuL29wZXJhdG9ycy9hdHRyL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzcgZnJvbSBcIi4vb3BlcmF0b3JzL1tdL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU183IGZyb20gXCIuL29wZXJhdG9ycy9bXS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF84IGZyb20gXCIuL29wZXJhdG9ycy9GbG9vckRpdi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfOCBmcm9tIFwiLi9vcGVyYXRvcnMvRmxvb3JEaXYvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfOSBmcm9tIFwiLi9vcGVyYXRvcnMvRGl2L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU185IGZyb20gXCIuL29wZXJhdG9ycy9EaXYvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTAgZnJvbSBcIi4vb3BlcmF0b3JzLz09L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMCBmcm9tIFwiLi9vcGVyYXRvcnMvPT0vYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTEgZnJvbSBcIi4vb3BlcmF0b3JzLz0vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzExIGZyb20gXCIuL29wZXJhdG9ycy89L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEyIGZyb20gXCIuL29wZXJhdG9ycy8tL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMiBmcm9tIFwiLi9vcGVyYXRvcnMvLS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMyBmcm9tIFwiLi9vcGVyYXRvcnMvKy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTMgZnJvbSBcIi4vb3BlcmF0b3JzLysvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTQgZnJvbSBcIi4vb3BlcmF0b3JzLyovYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE0IGZyb20gXCIuL29wZXJhdG9ycy8qL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE1IGZyb20gXCIuL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTUgZnJvbSBcIi4vbGl0ZXJhbHMvc3RyL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE2IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTYgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzE3IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xNyBmcm9tIFwiLi9saXRlcmFscy9mbG9hdC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xOCBmcm9tIFwiLi9saXRlcmFscy9mLXN0cmluZy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTggZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTkgZnJvbSBcIi4vbGl0ZXJhbHMvZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE5IGZyb20gXCIuL2xpdGVyYWxzL2Ytc3RyaW5nL0Zvcm1hdHRlZFZhbHVlL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIwIGZyb20gXCIuL2xpdGVyYWxzL2Jvb2wvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzIwIGZyb20gXCIuL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjEgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjEgZnJvbSBcIi4vbGl0ZXJhbHMvTm9uZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yMiBmcm9tIFwiLi9rZXl3b3Jkcy9yYWlzZS9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjIgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMjIgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvcnVudGltZS50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIzIGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjMgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI0IGZyb20gXCIuL2tleXdvcmRzL2ltcG9ydC9hbGlhcy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjQgZnJvbSBcIi4va2V5d29yZHMvaW1wb3J0L2FsaWFzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzI1IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjUgZnJvbSBcIi4va2V5d29yZHMvYXNzZXJ0L2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzI1IGZyb20gXCIuL2tleXdvcmRzL2Fzc2VydC9ydW50aW1lLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjYgZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjYgZnJvbSBcIi4vZnVuY3Rpb25zL2RlZi9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8yNyBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMjcgZnJvbSBcIi4vZnVuY3Rpb25zL2NhbGwvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjggZnJvbSBcIi4vY29udHJvbGZsb3dzL3doaWxlL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yOCBmcm9tIFwiLi9jb250cm9sZmxvd3Mvd2hpbGUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMjkgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18yOSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgICAgIFJVTlRJTUVfMjkgZnJvbSBcIi4vY29udHJvbGZsb3dzL3RyeWJsb2NrL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMCBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svdHJ5L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMxIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaGJsb2NrL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zMSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2hibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMiBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svY2F0Y2gvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzMyIGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9jYXRjaC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zMyBmcm9tIFwiLi9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzMgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzQgZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzQgZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8zNSBmcm9tIFwiLi9jb21tZW50cy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMzUgZnJvbSBcIi4vY29tbWVudHMvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMzYgZnJvbSBcIi4vY2xhc3MvY2xhc3NkZWYvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzM2IGZyb20gXCIuL2NsYXNzL2NsYXNzZGVmL2FzdDJqcy50c1wiO1xuXG5cbmNvbnN0IE1PRFVMRVMgPSB7XG5cdFwic3ltYm9sXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMFxuXHR9LFxuXHRcInN0cnVjdHMudHVwbGVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xXG5cdH0sXG5cdFwic3RydWN0cy5saXN0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMlxuXHR9LFxuXHRcInN0cnVjdHMuZGljdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzNcblx0fSxcblx0XCJyZXR1cm5cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF80LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU180XG5cdH0sXG5cdFwicGFzc1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzVcblx0fSxcblx0XCJvcGVyYXRvcnMuYXR0clwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzZcblx0fSxcblx0XCJvcGVyYXRvcnMuW11cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF83LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU183XG5cdH0sXG5cdFwib3BlcmF0b3JzLkZsb29yRGl2XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfOCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfOFxuXHR9LFxuXHRcIm9wZXJhdG9ycy5EaXZcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF85LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU185XG5cdH0sXG5cdFwib3BlcmF0b3JzLj09XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEwXG5cdH0sXG5cdFwib3BlcmF0b3JzLj1cIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTFcblx0fSxcblx0XCJvcGVyYXRvcnMuLVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzEyLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xMlxuXHR9LFxuXHRcIm9wZXJhdG9ycy4rXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEzXG5cdH0sXG5cdFwib3BlcmF0b3JzLipcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTRcblx0fSxcblx0XCJsaXRlcmFscy5zdHJcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTVcblx0fSxcblx0XCJsaXRlcmFscy5pbnRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNixcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTZcblx0fSxcblx0XCJsaXRlcmFscy5mbG9hdFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE3LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xN1xuXHR9LFxuXHRcImxpdGVyYWxzLmYtc3RyaW5nXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzE4XG5cdH0sXG5cdFwibGl0ZXJhbHMuZi1zdHJpbmcvRm9ybWF0dGVkVmFsdWVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xOSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTlcblx0fSxcblx0XCJsaXRlcmFscy5ib29sXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIwXG5cdH0sXG5cdFwibGl0ZXJhbHMuTm9uZVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzIxLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yMVxuXHR9LFxuXHRcImtleXdvcmRzLnJhaXNlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIyXG5cdH0sXG5cdFwia2V5d29yZHMuaW1wb3J0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjMsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzIzXG5cdH0sXG5cdFwia2V5d29yZHMuaW1wb3J0L2FsaWFzXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI0XG5cdH0sXG5cdFwia2V5d29yZHMuYXNzZXJ0XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjUsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI1XG5cdH0sXG5cdFwiZnVuY3Rpb25zLmRlZlwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzI2LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yNlxuXHR9LFxuXHRcImZ1bmN0aW9ucy5jYWxsXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjcsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI3XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLndoaWxlXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjgsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI4XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMjksXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzI5XG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrL3RyeVwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzMwLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zMFxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy50cnlibG9jay9jYXRjaGJsb2NrXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzEsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzMxXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLnRyeWJsb2NrL2NhdGNoXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzMyXG5cdH0sXG5cdFwiY29udHJvbGZsb3dzLmlmYmxvY2tcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzNcblx0fSxcblx0XCJjb250cm9sZmxvd3MuZm9yXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMzQsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzM0XG5cdH0sXG5cdFwiY29tbWVudHNcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8zNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMzVcblx0fSxcblx0XCJjbGFzcy5jbGFzc2RlZlwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzM2LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18zNlxuXHR9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBNT0RVTEVTO1xuXG5cbmNvbnN0IFJVTlRJTUUgPSB7fTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8yMik7XG5PYmplY3QuYXNzaWduKFJVTlRJTUUsIFJVTlRJTUVfMjUpO1xuT2JqZWN0LmFzc2lnbihSVU5USU1FLCBSVU5USU1FXzI5KTtcblxuXG5leHBvcnQgY29uc3QgX2JfID0gUlVOVElNRTtcbiIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSxjdXJzb3I6IENvZGVQb3MpIHtcbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCAhICh0eXBlb2Ygbm9kZS52YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIHx8ICEoXCJfX2NsYXNzX19cIiBpbiBub2RlLnZhbHVlKVxuICAgICAgICAgICAgfHwgbm9kZS52YWx1ZS5fX2NsYXNzX18uX19xdWFsbmFtZV9fICE9PSBcIk5vbmVUeXBlXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5Ob25lXCIsIFwiTm9uZVwiLCBudWxsKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcImJvb2xlYW5cIiApXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmJvb2xcIiwgXCJib29sXCIsIG5vZGUudmFsdWUpO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29uc3RhbnRcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcIiR7XCIsIGN1cnNvcik7XG4gICAgICAgIGpzKz0gdG9KUyh0aGlzLmNoaWxkcmVuWzBdLCBjdXJzb3IpO1xuICAgICAgICBqcys9IHRvSlMoXCJ9XCIsIGN1cnNvcik7XG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mLXN0cmluZy5Gb3JtYXR0ZWRWYWx1ZVwiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRm9ybWF0dGVkVmFsdWVcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcImBcIiwgY3Vyc29yKTtcblxuICAgIGNvbnNvbGUud2FybihcIj8/XCIsIHsuLi50aGlzfSk7XG5cbiAgICBmb3IobGV0IGNoaWxkIG9mIHRoaXMuY2hpbGRyZW4pIHtcblxuICAgICAgICBpZiggY2hpbGQucmVzdWx0X3R5cGUgPT09IFwic3RyXCIpIHtcblxuICAgICAgICAgICAgLy8gaDRja1xuICAgICAgICAgICAgY2hpbGQuanNjb2RlID0ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7Li4uY3Vyc29yfSxcbiAgICAgICAgICAgICAgICBlbmQ6IG51bGwgYXMgYW55XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBqcyArPSB0b0pTKGNoaWxkLnZhbHVlLCBjdXJzb3IpO1xuICAgICAgICAgICAgY2hpbGQuanNjb2RlLmVuZCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgICAgIH0gZWxzZSBpZihjaGlsZC50eXBlID09PSBcImxpdGVyYWxzLmYtc3RyaW5nLkZvcm1hdHRlZFZhbHVlXCIpIHtcbiAgICAgICAgICAgIGpzICs9IHRvSlMoY2hpbGQsIGN1cnNvcik7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5zdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAganMgKz0gdG9KUyhcImBcIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc29sZS53YXJuKFwiISFcIiwgey4uLm5vZGV9KTtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5mLXN0cmluZ1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgIC4uLm5vZGUudmFsdWVzLm1hcCggKGU6YW55KSA9PiBjb252ZXJ0X25vZGUoZSwgY29udGV4dCkgKVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiSm9pbmVkU3RyXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKG5vZGUudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHx8IG5vZGUudmFsdWUuX19jbGFzc19fPy5fX3F1YWxuYW1lX18gIT09IFwiZmxvYXRcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZmxvYXRcIiwgXCJmbG9hdFwiLCBub2RlLnZhbHVlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1uYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwibnVtYmVyXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5pbnRcIiwgXCJpbnRcIiwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgaWYoIHRoaXMudmFsdWVbMF0gPT09ICdcIicpXG4gICAgICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG4gICAgcmV0dXJuIHRvSlMocmBcIiR7dGhpcy52YWx1ZX1cImAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5zdHJcIiwgXCJzdHJcIiwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQgbGVmdCA6IGFueSA9IHRoaXMuY2hpbGRyZW5bMF07XG4gICAgbGV0IHJpZ2h0OiBhbnkgPSB0aGlzLmNoaWxkcmVuWzFdO1xuXG4gICAgaWYoIGxlZnQucmVzdWx0X3R5cGUgIT09IHJpZ2h0LnJlc3VsdF90eXBlICkge1xuICAgICAgICBpZiggbGVmdC5yZXN1bHRfdHlwZSA9PT0gJ2ludCcpXG4gICAgICAgICAgICBsZWZ0ID0gcmBOdW1iZXIoJHtsZWZ0fSlgO1xuICAgICAgICBpZiggcmlnaHQucmVzdWx0X3R5cGUgPT09ICdpbnQnKVxuICAgICAgICAgICAgcmlnaHQgPSByYE51bWJlcigke3JpZ2h0fSlgO1xuICAgIH1cblxuICAgIHJldHVybiB0b0pTKHJgJHtsZWZ0fSAqICR7cmlnaHR9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS5sZWZ0ICwgY29udGV4dCApO1xuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUucmlnaHQsIGNvbnRleHQpO1xuXG4gICAgbGV0IHR5cGUgPSBudWxsO1xuICAgIGlmKCBsZWZ0LnJlc3VsdF90eXBlID09PSByaWdodC5yZXN1bHRfdHlwZSlcbiAgICAgICAgdHlwZSA9IGxlZnQucmVzdWx0X3R5cGU7XG5cbiAgICAvL1RPRE8uLi5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuKlwiLCB0eXBlLCBudWxsLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHRcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQmluT3AuTXVsdFwiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19ICsgJHt0aGlzLmNoaWxkcmVuWzFdfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCAsIGNvbnRleHQgKTtcbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnJpZ2h0LCBjb250ZXh0KTtcblxuICAgIGxldCB0eXBlID0gbnVsbDtcbiAgICBpZiggbGVmdC5yZXN1bHRfdHlwZSA9PT0gcmlnaHQucmVzdWx0X3R5cGUpXG4gICAgICAgIHR5cGUgPSBsZWZ0LnJlc3VsdF90eXBlO1xuXG4gICAgLy9UT0RPLi4uXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLitcIiwgdHlwZSwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0XG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJpbk9wLkFkZFwiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19IC0gJHt0aGlzLmNoaWxkcmVuWzFdfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCAsIGNvbnRleHQgKTtcbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnJpZ2h0LCBjb250ZXh0KTtcblxuICAgIGxldCB0eXBlID0gbnVsbDtcbiAgICBpZiggbGVmdC5yZXN1bHRfdHlwZSA9PT0gcmlnaHQucmVzdWx0X3R5cGUpXG4gICAgICAgIHR5cGUgPSBsZWZ0LnJlc3VsdF90eXBlO1xuXG4gICAgLy9UT0RPLi4uXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLi1cIiwgdHlwZSwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0XG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJpbk9wLlN1YlwiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgaWYoIHRoaXMudHlwZS5lbmRzV2l0aChcIihpbml0KVwiKSApXG4gICAgICAgIGpzICs9IHRvSlMoXCJ2YXIgXCIsIGN1cnNvcik7XG5cbiAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgIGpzICs9IHRvSlMocmAgPSAke3RoaXMuY2hpbGRyZW5baV19YCwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHR5cGUgPSBcIm9wZXJhdG9ycy49XCI7XG5cbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KTtcbiAgICBsZXQgcmlnaHRfdHlwZTogc3RyaW5nfG51bGwgPSByaWdodC5yZXN1bHRfdHlwZTtcbiAgICBpZiggXCJhbm5vdGF0aW9uXCIgaW4gbm9kZSkge1xuICAgICAgICByaWdodF90eXBlID0gbm9kZS5hbm5vdGF0aW9uLmlkID8/IFwiTm9uZVwiO1xuICAgICAgICBpZiggcmlnaHQucmVzdWx0X3R5cGUgIT09IG51bGwgJiYgcmlnaHQucmVzdWx0X3R5cGUgIT09IHJpZ2h0X3R5cGUpXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJXcm9uZyByZXN1bHRfdHlwZVwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc011bHRpVGFyZ2V0ID0gXCJ0YXJnZXRzXCIgaW4gbm9kZTtcbiAgICBjb25zdCB0YXJnZXRzID0gaXNNdWx0aVRhcmdldCA/IG5vZGUudGFyZ2V0cyA6IFtub2RlLnRhcmdldF07XG5cbiAgICBjb25zdCBsZWZ0cyA9IHRhcmdldHMubWFwKCAobjphbnkpID0+IHtcblxuICAgICAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShuLCBjb250ZXh0ICk7XG5cbiAgICAgICAgaWYoIGxlZnQudHlwZSA9PT0gXCJzeW1ib2xcIikge1xuICAgIFxuICAgICAgICAgICAgLy8gaWYgZXhpc3RzLCBlbnN1cmUgdHlwZS5cbiAgICAgICAgICAgIGlmKCBsZWZ0LnZhbHVlIGluIGNvbnRleHQubG9jYWxfdmFyaWFibGVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tsZWZ0LnZhbHVlXTtcbiAgICAgICAgICAgICAgICBpZiggcmVzdWx0X3R5cGUgIT09IG51bGwgJiYgcmlnaHRfdHlwZSAhPT0gcmVzdWx0X3R5cGUpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldyb25nIHJlc3VsdF90eXBlXCIpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIGFubm90YXRpb25fdHlwZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0LnR5cGUgIT09IFwiY2xhc3NcIikge1xuICAgICAgICAgICAgICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2xlZnQudmFsdWVdID0gcmlnaHRfdHlwZTtcbiAgICAgICAgICAgICAgICB0eXBlICs9IFwiKGluaXQpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGVmdDtcbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCB0eXBlLCByaWdodF90eXBlLCBudWxsLFxuICAgICAgICBbXG4gICAgICAgICAgICAuLi5sZWZ0cyxcbiAgICAgICAgICAgIHJpZ2h0LFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBc3NpZ25cIiwgXCJBbm5Bc3NpZ25cIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICAvL1RPRE8gTm9uZSB0eXBlLi4uXG4gICAgLy9UT0RPIHN0clxuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19ID09ICR7dGhpcy5jaGlsZHJlblsxXX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBsZWZ0ICA9IGNvbnZlcnRfbm9kZShub2RlLmxlZnQsIGNvbnRleHQgKTtcbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLmNvbXBhcmF0b3JzWzBdLCBjb250ZXh0KTtcblxuICAgIGlmKGxlZnQucmVzdWx0X3R5cGUgPT09IG51bGwgfHwgcmlnaHQucmVzdWx0X3R5cGUgPT09IG51bGwpIHtcbiAgICAgICAgLy9UT0RPOiBvYmplY3QgcmVzdWx0X3R5cGUgdG9vLi4uXG4gICAgICAgIC8vdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy49PVwiLCBcImJvb2xcIiwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0LFxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbXBhcmVcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGxlZnQgOiBhbnkgPSB0aGlzLmNoaWxkcmVuWzBdO1xuICAgIGxldCByaWdodDogYW55ID0gdGhpcy5jaGlsZHJlblsxXTtcblxuICAgIGlmKCBsZWZ0LnJlc3VsdF90eXBlID09PSAnaW50JylcbiAgICAgICAgbGVmdCA9IHJgTnVtYmVyKCR7bGVmdH0pYDsgLy8gZGVsYXllZCB0b0pTID9cbiAgICBpZiggcmlnaHQucmVzdWx0X3R5cGUgPT09ICdpbnQnKVxuICAgICAgICByaWdodCA9IHJgTnVtYmVyKCR7cmlnaHR9KWA7XG5cbiAgICByZXR1cm4gdG9KUyhyYCR7bGVmdH0gLyAke3JpZ2h0fWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCAsIGNvbnRleHQgKTtcbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnJpZ2h0LCBjb250ZXh0KTtcblxuICAgIGxldCB0eXBlID0gbnVsbDtcbiAgICBpZiggbGVmdC5yZXN1bHRfdHlwZSA9PT0gcmlnaHQucmVzdWx0X3R5cGUpXG4gICAgICAgIHR5cGUgPSBsZWZ0LnJlc3VsdF90eXBlO1xuXG4gICAgLy9UT0RPLi4uXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLi9cIiwgdHlwZSwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0XG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJpbk9wLkRpdlwiXTsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19IC8gJHt0aGlzLmNoaWxkcmVuWzFdfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKG5vZGUubGVmdCAsIGNvbnRleHQgKTtcbiAgICBjb25zdCByaWdodCA9IGNvbnZlcnRfbm9kZShub2RlLnJpZ2h0LCBjb250ZXh0KTtcblxuICAgIGxldCB0eXBlID0gbnVsbDtcbiAgICBpZiggbGVmdC5yZXN1bHRfdHlwZSA9PT0gcmlnaHQucmVzdWx0X3R5cGUpXG4gICAgICAgIHR5cGUgPSBsZWZ0LnJlc3VsdF90eXBlO1xuXG4gICAgLy9UT0RPLi4uXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLi9cIiwgdHlwZSwgbnVsbCxcbiAgICAgICAgW1xuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHJpZ2h0XG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFtcIkJpbk9wLkZsb29yRGl2XCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19WyR7dGhpcy5jaGlsZHJlblsxXX1dYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLltdXCIsIG51bGwsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnNsaWNlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJTdWJzY3JpcHRcIl07IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICBcbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy5jaGlsZHJlblswXX0uJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJvcGVyYXRvcnMuYXR0clwiLCBudWxsLCBub2RlLmF0dHIsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnZhbHVlLCBjb250ZXh0KVxuICAgICAgICBdXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBbXCJBdHRyaWJ1dGVcIl07IiwiaW1wb3J0IHsgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICByZXR1cm4gdG9KUyhcIi8qIG5vdCBpbXBsZW1lbnRlZCAqL1wiLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJwYXNzXCIsIG51bGwpO1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJQYXNzXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGlmKCB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIHRvSlMoXCJyZXR1cm4gbnVsbFwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIHRvSlMocmByZXR1cm4gJHt0aGlzLmNoaWxkcmVuWzBdfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICBpZihub2RlLnZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLnJldHVyblwiLCBcIk5vbmVcIiwgbnVsbCk7XG5cbiAgICBjb25zdCBleHByID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsIGNvbnRleHQpO1xuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImtleXdvcmRzLnJldHVyblwiLCBleHByLnJlc3VsdF90eXBlLCBudWxsLCBbZXhwcl0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUmV0dXJuXCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIGxldCBqcyA9IHRvSlMoXCJ7XCIsIGN1cnNvcik7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrPTIpIHtcbiAgICAgICAgaWYoaSAhPT0gMClcbiAgICAgICAgICAgIGpzKz0gdG9KUyhcIiwgXCIsIGN1cnNvcik7XG4gICAgICAgIGpzICs9IHRvSlMocmAke3RoaXMuY2hpbGRyZW5baV19OiAke3RoaXMuY2hpbGRyZW5baSsxXX1gLCBjdXJzb3IpO1xuICAgIH1cblxuICAgICAgICBqcys9IHRvSlMoXCJ9XCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICBcbiAgICBsZXQgY2hpbGRyZW4gPSBuZXcgQXJyYXkobm9kZS5rZXlzLmxlbmd0aCAqIDIpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBub2RlLmtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2hpbGRyZW5bMippXSAgID0gY29udmVydF9ub2RlKG5vZGUuICBrZXlzW2ldLCBjb250ZXh0KTtcbiAgICAgICAgY2hpbGRyZW5bMippKzFdID0gY29udmVydF9ub2RlKG5vZGUudmFsdWVzW2ldLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzdHJ1Y3RzLmRpY3RcIiwgbnVsbCwgbnVsbCwgXG4gICAgICAgIGNoaWxkcmVuXG4gICAgKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkRpY3RcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhcIltcIiwgY3Vyc29yKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmKGkgIT09IDApXG4gICAgICAgICAgICBqcys9IHRvSlMoXCIsIFwiLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgfVxuXG4gICAgICAgIGpzKz0gdG9KUyhcIl1cIiwgY3Vyc29yKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN0cnVjdHMubGlzdFwiLCBudWxsLCBudWxsLCBcbiAgICAgICAgbm9kZS5lbHRzLm1hcCggKG46IGFueSkgPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiTGlzdFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSB0b0pTKFwiT2JqZWN0LmZyZWV6ZShbXCIsIGN1cnNvcik7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZihpICE9PSAwKVxuICAgICAgICAgICAganMrPSB0b0pTKFwiLCBcIiwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gdG9KUyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cblxuICAgICAgICBqcys9IHRvSlMoXCJdKVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwic3RydWN0cy5saXN0XCIsIG51bGwsIG51bGwsIFxuICAgICAgICBub2RlLmVsdHMubWFwKCAobjogYW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUdXBsZVwiOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyh0aGlzLnZhbHVlLCBjdXJzb3IpOyAvL1RPRE9cbn0iLCJpbXBvcnQgX3JfIGZyb20gXCIuLi8uLi9jb3JlX3J1bnRpbWUvbGlzdHNcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5mdW5jdGlvbiBpc0NsYXNzKF86IHVua25vd24pIHtcbiAgICAvLyBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzUyNjU1OS90ZXN0aW5nLWlmLXNvbWV0aGluZy1pcy1hLWNsYXNzLWluLWphdmFzY3JpcHRcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoXyk/LnByb3RvdHlwZT8ud3JpdGFibGUgPT09IGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbnVsbDtcbiAgICBsZXQgdmFsdWUgPSBub2RlLmlkO1xuXG4gICAgaWYoIHZhbHVlID09PSAnc2VsZicpXG4gICAgICAgIHZhbHVlID0gJ3RoaXMnO1xuXG4gICAgZWxzZSBpZiggdmFsdWUgaW4gY29udGV4dC5sb2NhbF92YXJpYWJsZXMpXG4gICAgICAgIHJlc3VsdF90eXBlID0gY29udGV4dC5sb2NhbF92YXJpYWJsZXNbdmFsdWVdO1xuICAgIGVsc2UgaWYodmFsdWUgaW4gX3JfKSB7XG4gICAgICAgIGlmKCBpc0NsYXNzKF9yX1t2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgX3JfXSkgKVxuICAgICAgICAgICAgcmVzdWx0X3R5cGUgPSBgY2xhc3MuJHt2YWx1ZX1gO1xuXG4gICAgICAgIHZhbHVlID0gYF9yXy4ke3ZhbHVlfWA7XG4gICAgfVxuXG4gICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJzeW1ib2xcIiwgcmVzdWx0X3R5cGUsIHZhbHVlKTtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiTmFtZVwiOyIsImltcG9ydCBQeV9vYmplY3QgZnJvbSBcImNvcmVfcnVudGltZS9vYmplY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfRXhjZXB0aW9uIGV4dGVuZHMgUHlfb2JqZWN0IHtcblxufVxuXG5cbi8vIF9fdHJhY2ViYWNrX19cbiAgICAvLyB0Yl9uZXh0XG4gICAgLy8gdGJfZnJhbWVcbiAgICAgICAgLy8gZl9iYWNrID9cbiAgICAgICAgLy8gZl9sb2NhbCA6IGVuYWJsZSBvbmx5IGluIGNvbXBhdCBtb2RlLlxuICAgICAgICAvLyBmX2xpbmVubyAobGluZSlcbiAgICAgICAgLy8gZl9jb2RlXG4gICAgICAgICAgICAvLyBjb19uYW1lIChmY3QgbmFtZSA/KVxuICAgICAgICAgICAgLy8gY29fZmlsZW5hbWUiLCJpbXBvcnQgUHlfRXhjZXB0aW9uIGZyb20gXCIuL0V4Y2VwdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9KU0V4Y2VwdGlvbiBleHRlbmRzIFB5X0V4Y2VwdGlvbiB7XG5cbn0iLCJpbXBvcnQgUlVOVElNRV8wIGZyb20gXCIuL29iamVjdC50c1wiO1xuaW1wb3J0IFJVTlRJTUVfMSBmcm9tIFwiLi9FeGNlcHRpb25zL0pTRXhjZXB0aW9uLnRzXCI7XG5pbXBvcnQgUlVOVElNRV8yIGZyb20gXCIuL0V4Y2VwdGlvbnMvRXhjZXB0aW9uLnRzXCI7XG5cblxuY29uc3QgUlVOVElNRSA9IHtcblx0XCJvYmplY3RcIjogUlVOVElNRV8wLFxuXHRcIkpTRXhjZXB0aW9uXCI6IFJVTlRJTUVfMSxcblx0XCJFeGNlcHRpb25cIjogUlVOVElNRV8yLFxufVxuXG5leHBvcnQgZGVmYXVsdCBSVU5USU1FO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHlfb2JqZWN0IHtcblxufSIsIi8vIEJyeXRob24gbXVzdCBiZSBpbXBvcnRlZCBiZWZvcmUuXG5kZWNsYXJlIHZhciAkQjogYW55O1xuXG5pbXBvcnQge0FTVE5vZGV9IGZyb20gXCIuL3N0cnVjdHMvQVNUTm9kZVwiO1xuXG5pbXBvcnQgQ09SRV9NT0RVTEVTIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuXG5cbmV4cG9ydCB0eXBlIEFTVCA9IHtcbiAgICBub2RlczogQVNUTm9kZVtdLFxuICAgIGZpbGVuYW1lOiBzdHJpbmdcbn1cblxuY29uc3QgbW9kdWxlczogUmVjb3JkPHN0cmluZywgKHR5cGVvZiBDT1JFX01PRFVMRVMpW2tleW9mIHR5cGVvZiBDT1JFX01PRFVMRVNdW10+ID0ge31cblxuZm9yKGxldCBtb2R1bGVfbmFtZSBpbiBDT1JFX01PRFVMRVMpIHtcblxuICAgIGNvbnN0IG1vZHVsZSA9IENPUkVfTU9EVUxFU1ttb2R1bGVfbmFtZSBhcyBrZXlvZiB0eXBlb2YgQ09SRV9NT0RVTEVTXTtcblxuICAgIGxldCBuYW1lcyA9IFtcIm51bGxcIl07XG4gICAgaWYoIFwiYnJ5dGhvbl9uYW1lXCIgaW4gbW9kdWxlLkFTVF9DT05WRVJUKSB7XG5cbiAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkobW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZSkgKSB7XG4gICAgICAgICAgICBuYW1lcyA9IG1vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuYW1lcyA9IFttb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKGxldCBuYW1lIG9mIG5hbWVzKVxuICAgICAgICAobW9kdWxlc1tuYW1lXSA/Pz0gW10pLnB1c2gobW9kdWxlKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcHkyYXN0KGNvZGU6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZyk6IEFTVCB7XG5cbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIGZpbGVuYW1lLCAnZmlsZScpO1xuXHRjb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIC8vY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cdHJldHVybiB7XG4gICAgICAgIG5vZGVzOiBjb252ZXJ0X2FzdChfYXN0KSxcbiAgICAgICAgZmlsZW5hbWVcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldE5vZGVUeXBlKGJyeXRob25fbm9kZTogYW55KTogc3RyaW5nIHtcbiAgICBsZXQgbmFtZSA9IGJyeXRob25fbm9kZS5zYnJ5dGhvbl90eXBlID8/IGJyeXRob25fbm9kZS5jb25zdHJ1Y3Rvci4kbmFtZTtcblxuICAgIGlmKG5hbWUgPT09ICdCaW5PcCcpXG4gICAgICAgIG5hbWUgPSBgQmluT3AuJHticnl0aG9uX25vZGUub3AuY29uc3RydWN0b3IuJG5hbWV9YDtcblxuICAgIHJldHVybiBuYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ub2RlKGJyeXRob25fbm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICBsZXQgbmFtZSA9IGdldE5vZGVUeXBlKGJyeXRob25fbm9kZSk7XG5cbiAgICBpZiggIShuYW1lIGluIG1vZHVsZXMpICkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJNb2R1bGUgbm90IHJlZ2lzdGVyZWQ6XCIsIG5hbWUpO1xuICAgICAgICBjb25zb2xlLndhcm4oYGF0ICR7YnJ5dGhvbl9ub2RlLmxpbmVub306JHticnl0aG9uX25vZGUuY29sX29mZnNldH1gKTtcbiAgICAgICAgY29uc29sZS5sb2coIGJyeXRob25fbm9kZSApO1xuICAgICAgICBuYW1lID0gXCJudWxsXCJcbiAgICB9XG5cbiAgICAvLyB3ZSBtYXkgaGF2ZSBtYW55IG1vZHVsZXMgZm9yIHRoZSBzYW1lIG5vZGUgdHlwZS5cbiAgICBmb3IobGV0IG1vZHVsZSBvZiBtb2R1bGVzW25hbWVdKSB7IFxuICAgICAgICBjb25zdCByZXN1bHQgPSBtb2R1bGUuQVNUX0NPTlZFUlQoYnJ5dGhvbl9ub2RlLCBjb250ZXh0KTtcbiAgICAgICAgaWYocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC50b0pTID0gbW9kdWxlLkFTVDJKUztcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmVycm9yKGJyeXRob25fbm9kZSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBub2RlICR7bmFtZX0gYXQgJHticnl0aG9uX25vZGUubGluZW5vfToke2JyeXRob25fbm9kZS5jb2xfb2Zmc2V0fWApO1xufVxuXG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2JvZHkobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBjb25zdCBsaW5lcyA9IG5vZGUuYm9keS5tYXAoIChtOmFueSkgPT4gY29udmVydF9saW5lKG0sIGNvbnRleHQpICk7XG4gICAgY29uc3QgbGFzdCA9IG5vZGUuYm9keVtub2RlLmJvZHkubGVuZ3RoLTFdO1xuXG4gICAgY29uc3QgdmlydF9ub2RlID0ge1xuICAgICAgICBsaW5lbm8gICAgOiBub2RlLmJvZHlbMF0ubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBub2RlLmJvZHlbMF0uY29sX29mZnNldCxcblxuICAgICAgICBlbmRfbGluZW5vICAgIDogbGFzdC5lbmRfbGluZW5vLFxuICAgICAgICBlbmRfY29sX29mZnNldDogbGFzdC5lbmRfY29sX29mZnNldFxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZSh2aXJ0X25vZGUsIFwiYm9keVwiLCBudWxsLCBudWxsLCBsaW5lcyk7XG59XG4vL1RPRE86IG1vdmUyY29yZV9tb2R1bGVzID9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2FyZ3Mobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgX2FyZ3MgPSBub2RlLmFyZ3MuYXJncztcbiAgICBpZiggY29udGV4dC50eXBlID09PSBcImNsYXNzXCIpXG4gICAgICAgIF9hcmdzID0gX2FyZ3Muc2xpY2UoMSk7XG5cbiAgICBjb25zdCBhcmdzID0gX2FyZ3MubWFwKCAobTphbnkpID0+IGNvbnZlcnRfYXJnKG0sIGNvbnRleHQpICk7IC8vVE9ETy4uLlxuICAgIFxuICAgIGxldCBmaXJzdDogYW55O1xuICAgIGxldCBsYXN0IDogYW55O1xuICAgIGlmKCBhcmdzLmxlbmd0aCAhPT0gMCkge1xuXG4gICAgICAgIGZpcnN0PSBub2RlLmFyZ3MuYXJnc1swXTtcbiAgICAgICAgbGFzdCA9IG5vZGUuYXJncy5hcmdzW25vZGUuYXJncy5hcmdzLmxlbmd0aC0xXTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFuIGVzdGltYXRpb24uLi5cbiAgICAgICAgY29uc3QgY29sID0gbm9kZS5jb2xfb2Zmc2V0ICsgNCArIG5vZGUubmFtZS5sZW5ndGggKyAxO1xuXG4gICAgICAgIGZpcnN0ID0gbGFzdCA9IHtcbiAgICAgICAgICAgIGxpbmVubzogbm9kZS5saW5lbm8sXG4gICAgICAgICAgICBlbmRfbGluZW5vOiBub2RlLmxpbmVubyxcbiAgICAgICAgICAgIGNvbF9vZmZzZXQ6IGNvbCxcbiAgICAgICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBjb2xcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgdmlydF9ub2RlID0ge1xuICAgICAgICBsaW5lbm8gICAgOiBmaXJzdC5saW5lbm8sXG4gICAgICAgIGNvbF9vZmZzZXQ6IGZpcnN0LmNvbF9vZmZzZXQsXG5cbiAgICAgICAgZW5kX2xpbmVubyAgICA6IGxhc3QuZW5kX2xpbmVubyxcbiAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGxhc3QuZW5kX2NvbF9vZmZzZXRcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUodmlydF9ub2RlLCBcImFyZ3NcIiwgbnVsbCwgbnVsbCwgYXJncyk7XG59XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hcmcobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJhcmdcIiwgbm9kZS5hbm5vdGF0aW9uPy5pZCwgbm9kZS5hcmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlzdHBvcyhub2RlOiBhbnlbXSkge1xuXG4gICAgbGV0IGJlZyA9IG5vZGVbMF07XG4gICAgbGV0IGVuZCA9IG5vZGVbbm9kZS5sZW5ndGgtMV07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICAvL2xpbmVubyA6IGJlZy5saW5lbm8gLSAxLFxuICAgICAgICAvL2NvbF9vZmZzZXQ6IG5vZGUuY29sX29mZnNldCxcbiAgICAgICAgbGluZW5vIDogYmVnLmxpbmVubyxcbiAgICAgICAgY29sX29mZnNldDogYmVnLmNvbF9vZmZzZXQsXG4gICAgICAgIGVuZF9saW5lbm86IGVuZC5lbmRfbGluZW5vLFxuICAgICAgICBlbmRfY29sX29mZnNldDogZW5kLmVuZF9jb2xfb2Zmc2V0LFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X2xpbmUobGluZTogYW55LCBjb250ZXh0OiBDb250ZXh0KTogQVNUTm9kZSB7XG5cbiAgICBsZXQgbm9kZSA9IGxpbmU7XG5cbiAgICBpZiggbGluZS5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJFeHByXCIpXG4gICAgICAgIG5vZGUgPSBsaW5lLnZhbHVlO1xuICAgIC8qXG4gICAgaWYoIFwidmFsdWVcIiBpbiBsaW5lICYmICEgKFwidGFyZ2V0c1wiIGluIGxpbmUpICYmICEgKFwidGFyZ2V0XCIgaW4gbGluZSkgKVxuICAgICAgICBub2RlID0gbGluZS52YWx1ZTsqL1xuXG4gICAgcmV0dXJuIGNvbnZlcnRfbm9kZSggbm9kZSwgY29udGV4dCApO1xufVxuXG5leHBvcnQgY2xhc3MgQ29udGV4dCB7XG4gICAgY29uc3RydWN0b3IodHlwZTogXCI/XCJ8XCJjbGFzc1wifFwiZmN0XCIgPSBcIj9cIiwgcGFyZW50X2NvbnRleHQ6IENvbnRleHR8bnVsbCA9IG51bGwpIHtcblxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgICAgIHRoaXMubG9jYWxfdmFyaWFibGVzID0gcGFyZW50X2NvbnRleHQgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKG51bGwpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogey4uLnBhcmVudF9jb250ZXh0LmxvY2FsX3ZhcmlhYmxlc31cbiAgICB9XG4gICAgdHlwZTtcbiAgICBsb2NhbF92YXJpYWJsZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZ3xudWxsPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXN0KGFzdDogYW55KTogQVNUTm9kZVtdIHtcblxuICAgIGNvbnN0IGNvbnRleHQgPSBuZXcgQ29udGV4dCgpO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5KGFzdC5ib2R5Lmxlbmd0aCk7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFzdC5ib2R5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIC8vVE9ETzogZGV0ZWN0IGNvbW1lbnRzXG4gICAgICAgIHJlc3VsdFtpXSA9IGNvbnZlcnRfbGluZShhc3QuYm9keVtpXSwgY29udGV4dCk7XG5cblxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3VsdFtpXS50eXBlKTtcbiAgICB9XG5cbiAgICAvL1RPRE86IGRldGVjdCBjb21tZW50cy4uLlxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn0iLCJpbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxudHlwZSBDdXJzb3IgPSB7XG4gICAgb2Zmc2V0OiBudW1iZXIsXG4gICAgbGluZSAgOiBudW1iZXIsXG4gICAgbGluZV9vZmZzZXQ6IG51bWJlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHkyYXN0KGNvZGU6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZyk6IEFTVCB7XG5cbiAgICBjb25zdCBub2RlcyA9IG5ldyBBcnJheTxBU1ROb2RlPigpO1xuXG4gICAgbGV0IGN1cnNvciA9IHtcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBsaW5lOiAxLFxuICAgICAgICBsaW5lX29mZnNldCA6IDBcbiAgICB9O1xuXG4gICAgbGV0IGNoYXI7XG4gICAgZG8ge1xuICAgICAgICBub2Rlcy5wdXNoKCBwYXJzZUV4cHJlc3Npb24oY29kZSwgY3Vyc29yKSBhcyBhbnkpO1xuICAgICAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICAgICAgd2hpbGUoIGNoYXIgPT09ICdcXG4nICkge1xuICAgICAgICAgICAgY2hhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcbiAgICAgICAgICAgICsrY3Vyc29yLmxpbmU7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJzb3IubGluZV9vZmZzZXQgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgfSB3aGlsZSggY2hhciAhPT0gdW5kZWZpbmVkICk7XG5cbiAgICAvL2NvbnN0IHBhcnNlciA9IG5ldyAkQi5QYXJzZXIoY29kZSwgZmlsZW5hbWUsICdmaWxlJyk7XG5cdC8vY29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXHRyZXR1cm4ge1xuICAgICAgICBub2RlcyxcbiAgICAgICAgZmlsZW5hbWVcbiAgICB9XG59XG5cbmltcG9ydCBhc3QyanNfY29udmVydCBmcm9tIFwiLi9jb3JlX21vZHVsZXMvc3ltYm9sL2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZVN5bWJvbChjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNhciA+PSAnYScgJiYgY2FyIDw9ICd6JyB8fCBjYXIgPj0gJ0EnICYmIGNhciA8PSAnWicgfHwgY2FyID49ICcwJyAmJiBjYXIgPD0gJzknIHx8IGNhciA9PSAnXycgKVxuICAgICAgICBjYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgY29uc3Qgc3ltYm9sID0gY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpO1xuXG4gICAgLy9UT0RPOiBpZiBrZXl3b3JkLi4uXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJzeW1ib2xcIixcbiAgICAgICAgdmFsdWUgICA6IHN5bWJvbCwgLy9UT0RPOiBjZiBjb252ZXJ0IChzZWFyY2ggaW4gbG9jYWwgdmFyaWFibGVzL0NvbnRleHQuLi4pXG4gICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgcmVzdWx0X3R5cGU6IG51bGwsXG5cbiAgICAgICAgdG9KUzogYXN0MmpzX2NvbnZlcnRcbiAgICB9O1xufVxuXG5pbXBvcnQgYXN0MmpzX2xpdGVyYWxzX2ludCBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZU51bWJlcihjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgLy9UT0RPOiByZWFsLi4uXG5cbiAgICBsZXQgY2FyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyID49ICcwJyAmJiBjYXIgPD0gJzknIClcbiAgICAgICAgY2FyICA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcImxpdGVyYWxzLmludFwiLFxuICAgICAgICB2YWx1ZSAgIDogY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19saXRlcmFsc19pbnQsXG4gICAgfVxufVxuXG5pbXBvcnQgYXN0MmpzX2xpdGVyYWxzX3N0ciBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvc3RyL2FzdDJqc1wiO1xuXG5mdW5jdGlvbiBwYXJzZVN0cmluZyhjb2RlOiBzdHJpbmcsIGN1cnNvcjogQ3Vyc29yKSB7XG5cbiAgICBjb25zdCBiZWdpbl9zdHIgPSBjdXJzb3Iub2Zmc2V0O1xuXG4gICAgbGV0IGNhciA9IGNvZGVbKytjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2FyICE9PSB1bmRlZmluZWQgJiYgY2FyICE9PSAnXCInICYmIGNvZGVbY3Vyc29yLm9mZnNldC0xXSAhPT0gJ1xcXFwnIClcbiAgICAgICAgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgKytjdXJzb3Iub2Zmc2V0O1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBcImxpdGVyYWxzLnN0cmluZ1wiLFxuICAgICAgICB2YWx1ZSAgIDogY29kZS5zbGljZShiZWdpbl9zdHIsIGN1cnNvci5vZmZzZXQpLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IGFzdDJqc19saXRlcmFsc19zdHIsXG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUV4cHJlc3Npb24oY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuICAgIGxldCBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcblxuICAgIGxldCBsZWZ0ID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgIGNoYXIgPSBjb2RlW2N1cnNvci5vZmZzZXRdO1xuICAgIGlmKCBjaGFyID09PSAnXFxuJylcbiAgICAgICAgcmV0dXJuIGxlZnQ7XG5cbiAgICBsZXQgb3AgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG4gICAgb3AhLmNoaWxkcmVuWzBdID0gbGVmdDtcbiAgICBvcC5weWNvZGUuc3RhcnQgPSBsZWZ0LnB5Y29kZS5zdGFydDtcblxuICAgIGxldCB2YWx1ZXMgPSBbb3AsIHBhcnNlVG9rZW4oY29kZSwgY3Vyc29yKV07XG5cbiAgICBjaGFyID0gY29kZVtjdXJzb3Iub2Zmc2V0XTtcbiAgICB3aGlsZSggY2hhciAhPT0gJ1xcbicgKSB7XG5cbiAgICAgICAgbGV0IG9wMiAgID0gcGFyc2VUb2tlbihjb2RlLCBjdXJzb3IpO1xuICAgICAgICBsZXQgcmlnaHQgPSBwYXJzZVRva2VuKGNvZGUsIGN1cnNvcik7XG5cbiAgICAgICAgbGV0IG9wMSAgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0yXTtcbiAgICAgICAgbGV0IGxlZnQgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXTtcblxuICAgICAgICAvL1RPRE86IGhhbmRsZSBvcCBwcmlvcml0eS4uLlxuICAgICAgICAvLyAoYStiKStjXG5cbiAgICAgICAgLy8gKGErYilcbiAgICAgICAgb3AxIS5jaGlsZHJlblsxXSA9IGxlZnQ7XG4gICAgICAgIG9wMSEucHljb2RlLmVuZCAgPSBsZWZ0LnB5Y29kZS5lbmQ7IFxuXG4gICAgICAgIC8vICgpK2NcbiAgICAgICAgb3AyIS5jaGlsZHJlblswXSA9IG9wMTtcbiAgICAgICAgb3AyLnB5Y29kZS5zdGFydCA9IG9wMS5weWNvZGUuc3RhcnQ7XG5cbiAgICAgICAgdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMl0gPSBvcDI7XG4gICAgICAgIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdID0gcmlnaHQ7XG5cbiAgICAgICAgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgfVxuXG4gICAgdmFsdWVzWzBdIS5jaGlsZHJlblsxXSA9IHZhbHVlc1sxXTtcbiAgICB2YWx1ZXNbMF0hLnB5Y29kZS5lbmQgID0gdmFsdWVzWzFdLnB5Y29kZS5lbmQ7XG5cbiAgICByZXR1cm4gdmFsdWVzWzBdO1xufVxuXG5mdW5jdGlvbiBwYXJzZU9wZXJhdG9yKGNvZGU6IHN0cmluZywgY3Vyc29yOiBDdXJzb3IpIHtcblxuICAgIGNvbnN0IGJlZ2luX3N0ciA9IGN1cnNvci5vZmZzZXQ7XG5cbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldCsrXTtcbiAgICAvKlxuICAgIHdoaWxlKCBjYXIgIT09IHVuZGVmaW5lZCAmJiBjYXIgIT09ICcnICYmIGNvZGVbY3Vyc29yLm9mZnNldC0xXSAhPT0gJ1xcXFwnIClcbiAgICAgICAgY2FyID0gY29kZVsrK2N1cnNvci5vZmZzZXRdOyovXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogXCJvcGVyYXRvcnMuXCIgKyBjaGFyLFxuICAgICAgICB2YWx1ZSAgIDogbnVsbCxcbiAgICAgICAgY2hpbGRyZW46IFt1bmRlZmluZWQsIHVuZGVmaW5lZF0sXG4gICAgICAgIHJlc3VsdF90eXBlOiBudWxsLFxuXG4gICAgICAgIHRvSlM6IENPUkVfTU9EVUxFU1tcIm9wZXJhdG9ycy5cIiArIGNoYXJdLkFTVDJKUyxcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW4oY29kZTogc3RyaW5nLCBjdXJzb3I6IEN1cnNvcikge1xuXG4gICAgLy8gaWdub3JlIHdoaXRlc3BhY2VcbiAgICBsZXQgY2hhciA9IGNvZGVbY3Vyc29yLm9mZnNldF07XG4gICAgd2hpbGUoIGNoYXIgPT09ICcgJyB8fCBjaGFyID09PSAnXFx0JyApXG4gICAgICAgIGNoYXIgID0gY29kZVsrK2N1cnNvci5vZmZzZXRdO1xuXG4gICAgLy8gaWdub3JlIGNoYXJcbiAgICBpZiggY2hhciA9PT0gdW5kZWZpbmVkIClcbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBzdGFydCA9IHtcbiAgICAgICAgbGluZTogY3Vyc29yLmxpbmUsXG4gICAgICAgIGNvbCA6IGN1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXRcbiAgICB9O1xuXG4gICAgbGV0IG5vZGUgPSBudWxsXG4gICAgaWYoIGNoYXIgPT09ICdcIicpXG4gICAgICAgIG5vZGUgPSBwYXJzZVN0cmluZyhjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2UgaWYoIGNoYXIgPj0gJ2EnICYmIGNoYXIgPD0gJ3onIHx8IGNoYXIgPj0gJ0EnICYmIGNoYXIgPD0gJ1onIHx8IGNoYXIgPT0gJ18nIClcbiAgICAgICAgbm9kZSA9IHBhcnNlU3ltYm9sKGNvZGUsIGN1cnNvcik7XG4gICAgZWxzZSBpZiggY2hhciA+PSAnMCcgJiYgY2hhciA8PSAnOScpXG4gICAgICAgIG5vZGUgPSBwYXJzZU51bWJlcihjb2RlLCBjdXJzb3IpO1xuICAgIGVsc2VcbiAgICAgICAgbm9kZSA9IHBhcnNlT3BlcmF0b3IoY29kZSwgY3Vyc29yKTtcbiAgICAgICAgLy87IHRocm93IG5ldyBFcnJvcihgRXJyb3Igd2hlbiBwYXJzaW5nICR7Y2hhcn0gYXQgJHtjdXJzb3IubGluZX06JHtjdXJzb3Iub2Zmc2V0IC0gY3Vyc29yLmxpbmVfb2Zmc2V0fSAoJHtjdXJzb3Iub2Zmc2V0fSlgKTtcblxuICAgIG5vZGUucHljb2RlID0ge1xuICAgICAgICBzdGFydCxcbiAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICBsaW5lOiBjdXJzb3IubGluZSxcbiAgICAgICAgICAgIGNvbCA6IGN1cnNvci5vZmZzZXQgLSBjdXJzb3IubGluZV9vZmZzZXRcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvL1RPRE86IGlzIG5leHQgYW4gb3BlcmF0b3IgPyAtPiBjb25zdHJ1aXJlIGFyYnJlLi4uXG4gICAgLy9UT0RPIGhhbmRsZSBvcGVyYXRvcnMgP1xuXG4gICAgcmV0dXJuIG5vZGU7XG5cbn0iLCJpbXBvcnQgeyBBU1QgfSBmcm9tIFwicHkyYXN0XCI7XG5cbmltcG9ydCB7ZGVmYXVsdCBhcyBfcl99IGZyb20gXCIuL2NvcmVfcnVudGltZS9saXN0c1wiO1xuaW1wb3J0IHtfYl99IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9saXN0c1wiO1xuXG5leHBvcnQge19iXywgX3JffTtcblxuLy8gY2xhc3NlID9cblxuXG5leHBvcnQgY2xhc3MgU0JyeXRob24ge1xuXG4gICAgI3JlZ2lzdGVyZWRfQVNUOiBSZWNvcmQ8c3RyaW5nLCBBU1Q+ID0ge307XG4gICAgI2V4cG9ydGVkOiBSZWNvcmQ8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBhbnk+PiA9IHtcbiAgICAgICAgYnJvd3NlcjogZ2xvYmFsVGhpc1xuICAgIH07XG5cbiAgICAvL1RPRE86IHJ1bkFTVCgpID9cbiAgICAvL1RPRE86IHJ1blB5dGhvbkNvZGUoKSA/XG5cbiAgICAvL1RPRE86IHNvbWVob3csIHJlbW92ZSBBU1QgYXJnID8/P1xuICAgIHJ1bkpTQ29kZShqc2NvZGU6IHN0cmluZywgYXN0OiBBU1QpIHtcblxuICAgICAgICBpZihhc3QuZmlsZW5hbWUgaW4gdGhpcy4jcmVnaXN0ZXJlZF9BU1QpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFTVCAke2FzdC5maWxlbmFtZX0gYWxyZWFkeSByZWdpc3RlcmVkIWApO1xuXG4gICAgICAgIC8vVE9ETzogZmlsZW5hbWUgMiBtb2R1bGVuYW1lLlxuICAgICAgICB0aGlzLiNyZWdpc3RlcmVkX0FTVFthc3QuZmlsZW5hbWVdID0gYXN0O1xuXG4gICAgICAgIGNvbnN0IGpzX2ZjdCA9IG5ldyBGdW5jdGlvbihcIl9fU0JSWVRIT05fX1wiLCBgJHtqc2NvZGV9XFxucmV0dXJuIF9fZXhwb3J0ZWRfXztgKTtcbiAgICAgICAgdGhpcy4jZXhwb3J0ZWRbYXN0LmZpbGVuYW1lXSA9IGpzX2ZjdCh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXRNb2R1bGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jZXhwb3J0ZWQ7XG4gICAgfVxuICAgIGdldE1vZHVsZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2V4cG9ydGVkW25hbWVdO1xuICAgIH1cblxuICAgIGdldEFTVEZvcihmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNyZWdpc3RlcmVkX0FTVFtmaWxlbmFtZV07IC8vVE9ETyBtb2R1bGVuYW1lP1xuICAgIH1cblxuICAgIGdldCBfcl8oKSB7XG4gICAgICAgIHJldHVybiBfcl87XG4gICAgfVxuICAgIGdldCBfYl8oKSB7XG4gICAgICAgIHJldHVybiBfYl87XG4gICAgfVxufVxuXG4iLCJleHBvcnQgdHlwZSBDb2RlUG9zID0ge1xuICAgIGxpbmU6IG51bWJlcixcbiAgICBjb2wgOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgQ29kZVJhbmdlID0ge1xuICAgIHN0YXJ0OiBDb2RlUG9zLFxuICAgIGVuZCAgOiBDb2RlUG9zXG59XG5cbmludGVyZmFjZSBJQVNUTm9kZSAge1xuXG5cdHR5cGUgICAgOiBzdHJpbmc7XG5cdHZhbHVlICAgOiBhbnk7XG5cdGNoaWxkcmVuOiBBU1ROb2RlW107XG5cdHJlc3VsdF90eXBlOiBzdHJpbmd8bnVsbDtcblxuICAgIHB5Y29kZTogQ29kZVJhbmdlO1xuICAgIGpzY29kZT86IENvZGVSYW5nZTtcblxuXHR0b0pTPzogKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykgPT4gc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgQVNUTm9kZSBpbXBsZW1lbnRzIElBU1ROb2RlIHtcblxuXHR0eXBlICAgIDogc3RyaW5nO1xuXHR2YWx1ZSAgIDogYW55O1xuXHRjaGlsZHJlbjogQVNUTm9kZVtdID0gW107XG5cdHJlc3VsdF90eXBlOiBzdHJpbmd8bnVsbCA9IG51bGw7XG5cbiAgICBweWNvZGU6IENvZGVSYW5nZTtcbiAgICBqc2NvZGU/OiBDb2RlUmFuZ2U7XG5cblx0dG9KUz86ICh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpID0+IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihicnl0aG9uX25vZGU6IGFueSwgdHlwZTogc3RyaW5nLCByZXN1bHRfdHlwZTogc3RyaW5nfG51bGwsIF92YWx1ZTogYW55ID0gbnVsbCwgY2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdKSB7XG5cblx0XHR0aGlzLnR5cGUgICA9IHR5cGU7XG5cdFx0dGhpcy5yZXN1bHRfdHlwZSA9IHJlc3VsdF90eXBlO1xuXHRcdHRoaXMudmFsdWUgID0gX3ZhbHVlO1xuXHRcdHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbiE7XG5cdFx0dGhpcy5weWNvZGUgPSB7XG5cdFx0XHRzdGFydDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUubGluZW5vLFxuXHRcdFx0XHRjb2w6IGJyeXRob25fbm9kZS5jb2xfb2Zmc2V0XG5cdFx0XHR9LFxuXHRcdFx0ZW5kOiB7XG5cdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5lbmRfbGluZW5vLFxuXHRcdFx0XHRjb2w6IGJyeXRob25fbm9kZS5lbmRfY29sX29mZnNldFxuXHRcdFx0fVxuXHRcdH1cblx0fVxufSIsImltcG9ydCB7IGFzdG5vZGUyanMsIG5ld2xpbmUsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcIi4vQVNUTm9kZVwiO1xuXG5cbmV4cG9ydCBjbGFzcyBCb2R5IHtcblxuICAgIG5vZGU7XG4gICAgcHJpbnRfYnJhY2tldDtcbiAgICBpZHg7XG5cbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBBU1ROb2RlLCBwcmludF9icmFja2V0ID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmlkeCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoLTE7IC8vVE9ETyBzZWFyY2ggYm9keS4uLlxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgICAgICB0aGlzLnByaW50X2JyYWNrZXQgPSBwcmludF9icmFja2V0O1xuICAgIH1cblxuICAgIHRvSlMoY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICAgICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgICAgICBsZXQganMgPSBcIlwiO1xuICAgICAgICBpZih0aGlzLnByaW50X2JyYWNrZXQpXG4gICAgICAgICAgICBqcys9XCJ7XCI7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLm5vZGUuY2hpbGRyZW5bdGhpcy5pZHhdOy8vYm9keTogQVNUTm9kZVtdO1xuICAgIFxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYm9keS5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAganMgKz0gbmV3bGluZSh0aGlzLm5vZGUsIGN1cnNvciwgMSk7XG4gICAgICAgICAgICBqcyArPSBhc3Rub2RlMmpzKGJvZHkuY2hpbGRyZW5baV0sIGN1cnNvcilcbiAgICAgICAgICAgIGpzICs9IHRvSlMoXCI7XCIsIGN1cnNvcilcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZih0aGlzLnByaW50X2JyYWNrZXQpIHtcbiAgICAgICAgICAgIGpzICs9IG5ld2xpbmUodGhpcy5ub2RlLCBjdXJzb3IpO1xuICAgICAgICAgICAganMgKz0gXCJ9XCI7XG4gICAgICAgICAgICBjdXJzb3IuY29sICs9IDE7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgYm9keS5qc2NvZGUgPSB7XG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICBlbmQgIDogey4uLmN1cnNvcn1cbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4ganM7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IHtweTJhc3QsIGNvbnZlcnRfYXN0fSBmcm9tIFwiLi9weTJhc3RcIjtcbmV4cG9ydCB7YXN0MmpzfSBmcm9tIFwiLi9hc3QyanNcIjtcbmV4cG9ydCB7cHkyYXN0IGFzIHB5MmFzdF9mYXN0fSBmcm9tIFwiLi9weTJhc3RfZmFzdFwiO1xuZXhwb3J0IHtTQnJ5dGhvbiwgX2JfLCBfcl99IGZyb20gXCIuL3J1bnRpbWVcIjtcblxuZXhwb3J0IHtwYXJzZV9zdGFjaywgc3RhY2tsaW5lMmFzdG5vZGV9IGZyb20gXCIuL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvdHJ5YmxvY2svcnVudGltZVwiOyJdLCJuYW1lcyI6WyJBU1ROb2RlIiwiQm9keSIsImFzdDJqcyIsImFzdCIsImV4cG9ydGVkIiwianMiLCJmaWxlbmFtZSIsImN1cnNvciIsImxpbmUiLCJjb2wiLCJub2RlIiwibm9kZXMiLCJhc3Rub2RlMmpzIiwidHlwZSIsInB1c2giLCJ2YWx1ZSIsInRvSlMiLCJuZXdsaW5lIiwiam9pbiIsInIiLCJzdHIiLCJhcmdzIiwibGVuZ3RoIiwiT2JqZWN0IiwiQXJyYXkiLCJpc0FycmF5IiwiZSIsInMiLCJpIiwiYm9keTJqcyIsImlkeCIsInByaW50X2JyYWNrZXQiLCJzdGFydCIsImJvZHkiLCJjaGlsZHJlbiIsImpzY29kZSIsImVuZCIsImFyZ3MyanMiLCJhcmcyanMiLCJpbmRlbnRfbGV2ZWwiLCJiYXNlX2luZGVudCIsImluY2x1ZGVzIiwiaW5kZW50IiwicGFkU3RhcnQiLCJiYXNlIiwiQ29udGV4dCIsImNvbnZlcnRfYm9keSIsImNvbnZlcnRfbm9kZSIsImNvbnZlcnQiLCJjb250ZXh0IiwibG9jYWxfdmFyaWFibGVzIiwibmFtZSIsImJhc2VzIiwiRXJyb3IiLCJicnl0aG9uX25hbWUiLCJfY3Vyc29yIiwiX2NvbnRleHQiLCJiZWciLCJpbmNyIiwidGFyZ2V0IiwiaWQiLCJpdGVyIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImZ1bmMiLCJtYXAiLCJuIiwia2V5d29yZCIsIm9mZnNldCIsImxpc3Rwb3MiLCJpZmJsb2NrIiwiY29uZCIsInRlc3QiLCJyZXN1bHRfdHlwZSIsInNicnl0aG9uX3R5cGUiLCJjdXIiLCJvcmVsc2UiLCJsaW5lbm8iLCJjb2xfb2Zmc2V0IiwiYXN0bm9kZSIsImNjIiwicHljb2RlIiwiaGFuZGxlcnMiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlciIsImgiLCJmaWx0ZXJfc3RhY2siLCJzdGFjayIsImZpbHRlciIsImZpbmRfYXN0bm9kZV9mcm9tX2pzY29kZV9wb3MiLCJzdGFja2xpbmUyYXN0bm9kZSIsInN0YWNrbGluZSIsInNiIiwiZ2V0QVNURm9yIiwic3RhY2syYXN0bm9kZXMiLCJwYXJzZV9zdGFjayIsInNwbGl0IiwiaXNWOCIsImwiLCJfIiwiX2xpbmUiLCJfY29sIiwic2xpY2UiLCJmY3RfbmFtZSIsInBvcyIsImluZGV4T2YiLCJkZWJ1Z19wcmludF9leGNlcHRpb24iLCJlcnIiLCJ3YXJuIiwiX3Jhd19lcnJfIiwic3RhY2tfc3RyIiwiZXhjZXB0aW9uX3N0ciIsInN0YXJ0c1dpdGgiLCJlbmRzV2l0aCIsImNvbnZlcnRfYXJncyIsImlzTWV0aG9kIiwiYXJnIiwiYXNzZXJ0IiwidW5kZWZpbmVkIiwiYXNuYW1lIiwibW9kdWxlIiwibmFtZXMiLCJleGMiLCJQeXRob25FcnJvciIsInB5dGhvbl9leGNlcHRpb24iLCJBU1RfQ09OVkVSVF8wIiwiQVNUMkpTXzAiLCJBU1RfQ09OVkVSVF8xIiwiQVNUMkpTXzEiLCJBU1RfQ09OVkVSVF8yIiwiQVNUMkpTXzIiLCJBU1RfQ09OVkVSVF8zIiwiQVNUMkpTXzMiLCJBU1RfQ09OVkVSVF80IiwiQVNUMkpTXzQiLCJBU1RfQ09OVkVSVF81IiwiQVNUMkpTXzUiLCJBU1RfQ09OVkVSVF82IiwiQVNUMkpTXzYiLCJBU1RfQ09OVkVSVF83IiwiQVNUMkpTXzciLCJBU1RfQ09OVkVSVF84IiwiQVNUMkpTXzgiLCJBU1RfQ09OVkVSVF85IiwiQVNUMkpTXzkiLCJBU1RfQ09OVkVSVF8xMCIsIkFTVDJKU18xMCIsIkFTVF9DT05WRVJUXzExIiwiQVNUMkpTXzExIiwiQVNUX0NPTlZFUlRfMTIiLCJBU1QySlNfMTIiLCJBU1RfQ09OVkVSVF8xMyIsIkFTVDJKU18xMyIsIkFTVF9DT05WRVJUXzE0IiwiQVNUMkpTXzE0IiwiQVNUX0NPTlZFUlRfMTUiLCJBU1QySlNfMTUiLCJBU1RfQ09OVkVSVF8xNiIsIkFTVDJKU18xNiIsIkFTVF9DT05WRVJUXzE3IiwiQVNUMkpTXzE3IiwiQVNUX0NPTlZFUlRfMTgiLCJBU1QySlNfMTgiLCJBU1RfQ09OVkVSVF8xOSIsIkFTVDJKU18xOSIsIkFTVF9DT05WRVJUXzIwIiwiQVNUMkpTXzIwIiwiQVNUX0NPTlZFUlRfMjEiLCJBU1QySlNfMjEiLCJBU1RfQ09OVkVSVF8yMiIsIkFTVDJKU18yMiIsIlJVTlRJTUVfMjIiLCJBU1RfQ09OVkVSVF8yMyIsIkFTVDJKU18yMyIsIkFTVF9DT05WRVJUXzI0IiwiQVNUMkpTXzI0IiwiQVNUX0NPTlZFUlRfMjUiLCJBU1QySlNfMjUiLCJSVU5USU1FXzI1IiwiQVNUX0NPTlZFUlRfMjYiLCJBU1QySlNfMjYiLCJBU1RfQ09OVkVSVF8yNyIsIkFTVDJKU18yNyIsIkFTVF9DT05WRVJUXzI4IiwiQVNUMkpTXzI4IiwiQVNUX0NPTlZFUlRfMjkiLCJBU1QySlNfMjkiLCJSVU5USU1FXzI5IiwiQVNUX0NPTlZFUlRfMzAiLCJBU1QySlNfMzAiLCJBU1RfQ09OVkVSVF8zMSIsIkFTVDJKU18zMSIsIkFTVF9DT05WRVJUXzMyIiwiQVNUMkpTXzMyIiwiQVNUX0NPTlZFUlRfMzMiLCJBU1QySlNfMzMiLCJBU1RfQ09OVkVSVF8zNCIsIkFTVDJKU18zNCIsIkFTVF9DT05WRVJUXzM1IiwiQVNUMkpTXzM1IiwiQVNUX0NPTlZFUlRfMzYiLCJBU1QySlNfMzYiLCJNT0RVTEVTIiwiQVNUX0NPTlZFUlQiLCJBU1QySlMiLCJSVU5USU1FIiwiYXNzaWduIiwiX2JfIiwiX19jbGFzc19fIiwiX19xdWFsbmFtZV9fIiwiY2hpbGQiLCJ2YWx1ZXMiLCJsZWZ0IiwicmlnaHQiLCJyaWdodF90eXBlIiwiYW5ub3RhdGlvbiIsImlzTXVsdGlUYXJnZXQiLCJ0YXJnZXRzIiwibGVmdHMiLCJjb21wYXJhdG9ycyIsImF0dHIiLCJleHByIiwia2V5cyIsImVsdHMiLCJfcl8iLCJpc0NsYXNzIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsInByb3RvdHlwZSIsIndyaXRhYmxlIiwiUHlfb2JqZWN0IiwiUHlfRXhjZXB0aW9uIiwiUHlfSlNFeGNlcHRpb24iLCJSVU5USU1FXzAiLCJSVU5USU1FXzEiLCJSVU5USU1FXzIiLCJDT1JFX01PRFVMRVMiLCJtb2R1bGVzIiwibW9kdWxlX25hbWUiLCJweTJhc3QiLCJjb2RlIiwicGFyc2VyIiwiJEIiLCJQYXJzZXIiLCJfYXN0IiwiX1B5UGVnZW4iLCJydW5fcGFyc2VyIiwiY29udmVydF9hc3QiLCJnZXROb2RlVHlwZSIsImJyeXRob25fbm9kZSIsIm9wIiwicmVzdWx0IiwiZXJyb3IiLCJsaW5lcyIsIm0iLCJjb252ZXJ0X2xpbmUiLCJsYXN0IiwidmlydF9ub2RlIiwiZW5kX2xpbmVubyIsImVuZF9jb2xfb2Zmc2V0IiwiX2FyZ3MiLCJjb252ZXJ0X2FyZyIsImZpcnN0IiwicGFyZW50X2NvbnRleHQiLCJjcmVhdGUiLCJsaW5lX29mZnNldCIsImNoYXIiLCJwYXJzZUV4cHJlc3Npb24iLCJhc3QyanNfY29udmVydCIsInBhcnNlU3ltYm9sIiwiYmVnaW5fc3RyIiwiY2FyIiwic3ltYm9sIiwiYXN0MmpzX2xpdGVyYWxzX2ludCIsInBhcnNlTnVtYmVyIiwiYXN0MmpzX2xpdGVyYWxzX3N0ciIsInBhcnNlU3RyaW5nIiwicGFyc2VUb2tlbiIsIm9wMiIsIm9wMSIsInBhcnNlT3BlcmF0b3IiLCJkZWZhdWx0IiwiU0JyeXRob24iLCJyZWdpc3RlcmVkX0FTVCIsImJyb3dzZXIiLCJnbG9iYWxUaGlzIiwicnVuSlNDb2RlIiwianNfZmN0IiwiRnVuY3Rpb24iLCJnZXRNb2R1bGVzIiwiZ2V0TW9kdWxlIiwiX3ZhbHVlIiwicHkyYXN0X2Zhc3QiXSwic291cmNlUm9vdCI6IiJ9