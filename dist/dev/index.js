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

function ast2js(ast) {
    let js = "";
    let cursor = {
        line: 1,
        col: 0
    };
    for (let node of ast){
        js += astnode2js(node, cursor);
        js += newline(node, cursor);
    }
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
    if (str instanceof structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode) {
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
        if (e instanceof structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode) {
            js += astnode2js(e, cursor);
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
function body2js(node, cursor, idx = 0) {
    const start = {
        ...cursor
    };
    let js = "{";
    const body = node.children[idx]; //body: ASTNode[];
    // h4ck due to } else/elif {
    const needs_offset = [
        "controlflows.else",
        "controlflows.elif",
        "controlflows.catchblock"
    ].includes(node.type);
    if (needs_offset) --node.jscode.start.col;
    for(let i = 0; i < body.children.length; ++i){
        js += newline(node, cursor, 1);
        js += astnode2js(body.children[i], cursor);
    }
    js += newline(node, cursor);
    js += "}";
    cursor.col += 1;
    // h4ck due to } else/elif/catch {
    if (needs_offset) ++node.jscode.start.col;
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
    const indent = indent_level * 4 + node.jscode.start.col;
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
        let beg = cur.orelse[0];
        let end = cur.orelse[cur.orelse.length - 1];
        children.push({
            sbrython_type: "If",
            ifblock: "else",
            body: cur.orelse,
            lineno: beg.lineno - 1,
            col_offset: node.col_offset,
            end_lineno: end.end_lineno,
            end_col_offset: end.end_col_offset
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
    if (this.type === "controlflows.tryblock") {
        let js = "";
        for(let i = 0; i < this.children.length; ++i)js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)(this.children[i], cursor);
        return js;
    }
    if (this.type === "controlflows.try") {
        let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("try", cursor);
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor);
        return js;
    }
    if (this.type === "controlflows.catchblock") {
        let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("catch(_err_){", cursor);
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 1);
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("if(true){", cursor); //TODO...
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("console.warn('exp', _err_);", cursor); // debug
        //TODO catch...
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 1);
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor, 0); //TODO
        //TODO only if no general catch...
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 1);
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("} else { throw _err_ }", cursor);
        --this.jscode.start.col; // h4ck
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.newline)(this, cursor, 0); // make new lines handle it ?
        --this.jscode.start.col; // h4ck
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("}", cursor);
        return js;
    }
/*
    //if
    let keyword = "if";
    if( this.type === "controlflows.elif")
        keyword = "else if";
    if( this.type === "controlflows.else")
        keyword = "else";

    let js = toJS(keyword, cursor);
    let offset = 0;
    if( keyword !== "else") {
        offset = 1;
        js += toJS(r`(${this.children[0]})`, cursor);
    }

    js += body2js(this, cursor, offset);

    return js;*/ }


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
    if ("tryblock" in node) {
        if (node.tryblock === "try") {
            return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, `controlflows.${node.tryblock}`, null, null, [
                (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
            ]);
        }
        if (node.tryblock === "catchblock") {
            console.log("cb", node);
            return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, `controlflows.${node.tryblock}`, null, null, [
                (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
            ]);
        }
    }
    node.sbrython_type = "Try";
    node.tryblock = "try";
    //TODO many excepts...
    const catchblock = {
        sbrython_type: "Try",
        tryblock: "catchblock",
        ...node.handlers[0] //TODO...
    };
    const children = [
        node,
        catchblock
    ];
    const astnode = new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "controlflows.tryblock", null, null, [
        ...children.map((n)=>(0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(n, context))
    ]);
    //TODO: for first child...
    /*
    for(let i = 0; i < astnode.children.length-1; ++i) {
        const cc = astnode.children[i].children;
        astnode.children[i].pycode.end = cc[cc.length-1].pycode.end;
    }*/ console.log(node);
    return astnode;
// node.body
// final.body // orelse
// handlers []
/*
    if( "ifblock" in node ) {

        if( node.ifblock === "else") {
            return new ASTNode(node, `controlflows.${node.ifblock}`, null, null, [
                convert_body(node, context)
            ]);
        }

        const cond = convert_node(node.test, context);
        
        if(cond.result_type !== "bool")
            throw new Error(`Type ${cond.result_type} not yet supported as if condition`);

        return new ASTNode(node, `controlflows.${node.ifblock}`, null, null, [
            cond,
            convert_body(node, context)
        ]);
    }

    node.sbrython_type = "If";
    node.ifblock = "if";

    const children = [
        node
    ];

    let cur = node;
    while( "orelse" in cur && cur.orelse.length === 1 && "test" in cur.orelse[0]) {
        cur = cur.orelse[0];
        cur.sbrython_type = "If";
        cur.ifblock = "elif";
        children.push(cur);
    }
    if( "orelse" in cur && cur.orelse.length !== 0 ) { // else

        let beg = cur.orelse[0];
        let end = cur.orelse[cur.orelse.length-1];

        children.push({
            sbrython_type: "If",
            ifblock: "else",
            body   : cur.orelse,
            lineno : beg.lineno - 1,
            col_offset: node.col_offset,
            end_lineno: end.end_lineno,
            end_col_offset: end.end_col_offset,
        })
    }

    const astnode = new ASTNode(node, "controlflows.ifblock", null, null, [
            ...children.map( n => convert_node(n, context) )
        ]);
    
    for(let i = 0; i < astnode.children.length-1; ++i) {
        const cc = astnode.children[i].children;
        astnode.children[i].pycode.end = cc[cc.length-1].pycode.end;
    }

    return astnode;*/ }
convert.brython_name = "Try";


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
    let js = (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`function ${this.value}`, cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.args2js)(this, cursor);
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.body2js)(this, cursor, 1);
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
    // new context for the function local variables
    context = {
        ...context
    };
    context.local_variables = {
        ...context.local_variables
    };
    for (let arg of args.children)context.local_variables[arg.value] = arg.result_type;
    // return type... node.returns.id
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "functions.def", null, node.name, [
        args,
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_body)(node, context)
    ]);
}
convert.brython_name = "FunctionDef";


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
    return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`throw new _b_.PythonError(${this.children[0]});`, cursor);
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
class PythonError {
    python_exception;
    constructor(python_exception){
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
/* harmony import */ var _return_astconvert_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./return/astconvert.ts */ "./src/core_modules/return/astconvert.ts");
/* harmony import */ var _return_ast2js_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./return/ast2js.ts */ "./src/core_modules/return/ast2js.ts");
/* harmony import */ var _pass_astconvert_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pass/astconvert.ts */ "./src/core_modules/pass/astconvert.ts");
/* harmony import */ var _pass_ast2js_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pass/ast2js.ts */ "./src/core_modules/pass/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./operators/==/astconvert.ts */ "./src/core_modules/operators/==/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./operators/==/ast2js.ts */ "./src/core_modules/operators/==/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./operators/=/astconvert.ts */ "./src/core_modules/operators/=/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./operators/=/ast2js.ts */ "./src/core_modules/operators/=/ast2js.ts");
/* harmony import */ var _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./operators/+/astconvert.ts */ "./src/core_modules/operators/+/astconvert.ts");
/* harmony import */ var _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./operators/+/ast2js.ts */ "./src/core_modules/operators/+/ast2js.ts");
/* harmony import */ var _literals_str_astconvert_ts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./literals/str/astconvert.ts */ "./src/core_modules/literals/str/astconvert.ts");
/* harmony import */ var _literals_str_ast2js_ts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./literals/str/ast2js.ts */ "./src/core_modules/literals/str/ast2js.ts");
/* harmony import */ var _literals_int_astconvert_ts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./literals/int/astconvert.ts */ "./src/core_modules/literals/int/astconvert.ts");
/* harmony import */ var _literals_int_ast2js_ts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./literals/int/ast2js.ts */ "./src/core_modules/literals/int/ast2js.ts");
/* harmony import */ var _literals_float_astconvert_ts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./literals/float/astconvert.ts */ "./src/core_modules/literals/float/astconvert.ts");
/* harmony import */ var _literals_float_ast2js_ts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./literals/float/ast2js.ts */ "./src/core_modules/literals/float/ast2js.ts");
/* harmony import */ var _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./literals/bool/astconvert.ts */ "./src/core_modules/literals/bool/astconvert.ts");
/* harmony import */ var _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./literals/bool/ast2js.ts */ "./src/core_modules/literals/bool/ast2js.ts");
/* harmony import */ var _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./literals/None/astconvert.ts */ "./src/core_modules/literals/None/astconvert.ts");
/* harmony import */ var _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./literals/None/ast2js.ts */ "./src/core_modules/literals/None/ast2js.ts");
/* harmony import */ var _keywords_raise_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./keywords/raise/astconvert.ts */ "./src/core_modules/keywords/raise/astconvert.ts");
/* harmony import */ var _keywords_raise_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./keywords/raise/ast2js.ts */ "./src/core_modules/keywords/raise/ast2js.ts");
/* harmony import */ var _keywords_raise_runtime_ts__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./keywords/raise/runtime.ts */ "./src/core_modules/keywords/raise/runtime.ts");
/* harmony import */ var _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./functions/def/astconvert.ts */ "./src/core_modules/functions/def/astconvert.ts");
/* harmony import */ var _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./functions/def/ast2js.ts */ "./src/core_modules/functions/def/ast2js.ts");
/* harmony import */ var _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./functions/call/astconvert.ts */ "./src/core_modules/functions/call/astconvert.ts");
/* harmony import */ var _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./functions/call/ast2js.ts */ "./src/core_modules/functions/call/ast2js.ts");
/* harmony import */ var _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./controlflows/while/astconvert.ts */ "./src/core_modules/controlflows/while/astconvert.ts");
/* harmony import */ var _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./controlflows/while/ast2js.ts */ "./src/core_modules/controlflows/while/ast2js.ts");
/* harmony import */ var _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./controlflows/tryblock/astconvert.ts */ "./src/core_modules/controlflows/tryblock/astconvert.ts");
/* harmony import */ var _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./controlflows/tryblock/ast2js.ts */ "./src/core_modules/controlflows/tryblock/ast2js.ts");
/* harmony import */ var _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./controlflows/ifblock/astconvert.ts */ "./src/core_modules/controlflows/ifblock/astconvert.ts");
/* harmony import */ var _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./controlflows/ifblock/ast2js.ts */ "./src/core_modules/controlflows/ifblock/ast2js.ts");
/* harmony import */ var _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./controlflows/for/astconvert.ts */ "./src/core_modules/controlflows/for/astconvert.ts");
/* harmony import */ var _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./controlflows/for/ast2js.ts */ "./src/core_modules/controlflows/for/ast2js.ts");
/* harmony import */ var _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./comments/astconvert.ts */ "./src/core_modules/comments/astconvert.ts");
/* harmony import */ var _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./comments/ast2js.ts */ "./src/core_modules/comments/ast2js.ts");







































const MODULES = {
    "symbol": {
        AST_CONVERT: _symbol_astconvert_ts__WEBPACK_IMPORTED_MODULE_0__["default"],
        AST2JS: _symbol_ast2js_ts__WEBPACK_IMPORTED_MODULE_1__["default"]
    },
    "return": {
        AST_CONVERT: _return_astconvert_ts__WEBPACK_IMPORTED_MODULE_2__["default"],
        AST2JS: _return_ast2js_ts__WEBPACK_IMPORTED_MODULE_3__["default"]
    },
    "pass": {
        AST_CONVERT: _pass_astconvert_ts__WEBPACK_IMPORTED_MODULE_4__["default"],
        AST2JS: _pass_ast2js_ts__WEBPACK_IMPORTED_MODULE_5__["default"]
    },
    "operators.==": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_6__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_7__["default"]
    },
    "operators.=": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_8__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_9__["default"]
    },
    "operators.+": {
        AST_CONVERT: _operators_astconvert_ts__WEBPACK_IMPORTED_MODULE_10__["default"],
        AST2JS: _operators_ast2js_ts__WEBPACK_IMPORTED_MODULE_11__["default"]
    },
    "literals.str": {
        AST_CONVERT: _literals_str_astconvert_ts__WEBPACK_IMPORTED_MODULE_12__["default"],
        AST2JS: _literals_str_ast2js_ts__WEBPACK_IMPORTED_MODULE_13__["default"]
    },
    "literals.int": {
        AST_CONVERT: _literals_int_astconvert_ts__WEBPACK_IMPORTED_MODULE_14__["default"],
        AST2JS: _literals_int_ast2js_ts__WEBPACK_IMPORTED_MODULE_15__["default"]
    },
    "literals.float": {
        AST_CONVERT: _literals_float_astconvert_ts__WEBPACK_IMPORTED_MODULE_16__["default"],
        AST2JS: _literals_float_ast2js_ts__WEBPACK_IMPORTED_MODULE_17__["default"]
    },
    "literals.bool": {
        AST_CONVERT: _literals_bool_astconvert_ts__WEBPACK_IMPORTED_MODULE_18__["default"],
        AST2JS: _literals_bool_ast2js_ts__WEBPACK_IMPORTED_MODULE_19__["default"]
    },
    "literals.None": {
        AST_CONVERT: _literals_None_astconvert_ts__WEBPACK_IMPORTED_MODULE_20__["default"],
        AST2JS: _literals_None_ast2js_ts__WEBPACK_IMPORTED_MODULE_21__["default"]
    },
    "keywords.raise": {
        AST_CONVERT: _keywords_raise_astconvert_ts__WEBPACK_IMPORTED_MODULE_22__["default"],
        AST2JS: _keywords_raise_ast2js_ts__WEBPACK_IMPORTED_MODULE_23__["default"]
    },
    "functions.def": {
        AST_CONVERT: _functions_def_astconvert_ts__WEBPACK_IMPORTED_MODULE_25__["default"],
        AST2JS: _functions_def_ast2js_ts__WEBPACK_IMPORTED_MODULE_26__["default"]
    },
    "functions.call": {
        AST_CONVERT: _functions_call_astconvert_ts__WEBPACK_IMPORTED_MODULE_27__["default"],
        AST2JS: _functions_call_ast2js_ts__WEBPACK_IMPORTED_MODULE_28__["default"]
    },
    "controlflows.while": {
        AST_CONVERT: _controlflows_while_astconvert_ts__WEBPACK_IMPORTED_MODULE_29__["default"],
        AST2JS: _controlflows_while_ast2js_ts__WEBPACK_IMPORTED_MODULE_30__["default"]
    },
    "controlflows.tryblock": {
        AST_CONVERT: _controlflows_tryblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_31__["default"],
        AST2JS: _controlflows_tryblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_32__["default"]
    },
    "controlflows.ifblock": {
        AST_CONVERT: _controlflows_ifblock_astconvert_ts__WEBPACK_IMPORTED_MODULE_33__["default"],
        AST2JS: _controlflows_ifblock_ast2js_ts__WEBPACK_IMPORTED_MODULE_34__["default"]
    },
    "controlflows.for": {
        AST_CONVERT: _controlflows_for_astconvert_ts__WEBPACK_IMPORTED_MODULE_35__["default"],
        AST2JS: _controlflows_for_ast2js_ts__WEBPACK_IMPORTED_MODULE_36__["default"]
    },
    "comments": {
        AST_CONVERT: _comments_astconvert_ts__WEBPACK_IMPORTED_MODULE_37__["default"],
        AST2JS: _comments_ast2js_ts__WEBPACK_IMPORTED_MODULE_38__["default"]
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MODULES);
const RUNTIME = {};
Object.assign(RUNTIME, _keywords_raise_runtime_ts__WEBPACK_IMPORTED_MODULE_24__["default"]);
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
    if (!("op" in node)) return;
    let op = node.op.constructor.$name;
    if (op === "Add") op = "+";
    if (op === "Eq") return;
    //TODO...
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.+", null, op, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left, context),
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.right, context)
    ]);
}


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
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)((0,ast2js__WEBPACK_IMPORTED_MODULE_0__.r)`${this.children[0]} = ${this.children[1]}`, cursor);
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
    let target = node.target;
    if ("targets" in node) target = node.targets[0];
    const left = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(target, context);
    const right = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.value, context);
    let right_type = right.result_type;
    if ("annotation" in node) {
        right_type = node.annotation.id ?? "None";
        if (right.result_type !== null && right.result_type !== right_type) throw new Error("Wrong result_type");
    }
    let type = "operators.=";
    if (left.type === "symbol") {
        // if exists, ensure type.
        if (left.value in context.local_variables) {
            const result_type = context.local_variables[left.value];
            if (result_type !== null && right_type !== result_type) throw new Error("Wrong result_type");
        // annotation_type
        } else {
            context.local_variables[left.value] = right_type;
            type += "(init)";
        }
    }
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, type, right_type, null, [
        left,
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
        throw new Error("Not implemented");
    }
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "operators.==", "bool", null, [
        left,
        right
    ]);
}
convert.brython_name = "Compare";


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
    if (this.children.length === 0) return (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.toJS)("return", cursor);
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
    if (node.value === undefined) return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "return", "None", null);
    const expr = (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.value, context);
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "return", expr.result_type, null, [
        expr
    ]);
}
convert.brython_name = "Return";


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
    return true;
}
function convert(node, context) {
    let result_type = null;
    let value = node.id;
    if (node.id in context.local_variables) result_type = context.local_variables[node.id];
    else if (node.id in _core_runtime_lists__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        value = `_r_.${node.id}`;
        if (isClass(_core_runtime_lists__WEBPACK_IMPORTED_MODULE_0__["default"][node.id])) result_type = `class.${node.id}`;
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
/* harmony import */ var _Exceptions_Exception_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Exceptions/Exception.ts */ "./src/core_runtime/Exceptions/Exception.ts");


const RUNTIME = {
    "object": _object_ts__WEBPACK_IMPORTED_MODULE_0__["default"],
    "Exception": _Exceptions_Exception_ts__WEBPACK_IMPORTED_MODULE_1__["default"]
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
/* harmony export */   convert_arg: () => (/* binding */ convert_arg),
/* harmony export */   convert_args: () => (/* binding */ convert_args),
/* harmony export */   convert_ast: () => (/* binding */ convert_ast),
/* harmony export */   convert_body: () => (/* binding */ convert_body),
/* harmony export */   convert_line: () => (/* binding */ convert_line),
/* harmony export */   convert_node: () => (/* binding */ convert_node),
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
function py2ast(code) {
    const parser = new $B.Parser(code, "filename", 'file');
    const _ast = $B._PyPegen.run_parser(parser);
    //console.log("AST", _ast);
    return convert_ast(_ast);
}
function convert_node(brython_node, context) {
    let name = brython_node.sbrython_type ?? brython_node.constructor.$name;
    if (!(name in modules)) {
        console.log(brython_node);
        console.warn("Module not registered", name);
        name = "null";
    }
    for (let module of modules[name]){
        const result = module.AST_CONVERT(brython_node, context);
        if (result !== undefined) {
            result.toJS = module.AST2JS;
            return result;
        }
    }
    /*
    for(let module_name in CORE_MODULES) {
        const module = CORE_MODULES[module_name as keyof typeof CORE_MODULES];
        let result = module.AST_CONVERT(brython_node, context);
        if(result !== undefined) {
            result.toJS = module.AST2JS;
            return result;
        }
    }
    */ console.error(brython_node);
    throw new Error("Unsupported node");
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
    const args = node.args.args.map((m)=>convert_arg(m, context)); //TODO...
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
    return new _structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "arg", node.annotation.id, node.arg);
}
function convert_line(line, context) {
    let node = line;
    if (line.constructor.$name === "Expr") node = line.value;
    /*
    if( "value" in line && ! ("targets" in line) && ! ("target" in line) )
        node = line.value;*/ return convert_node(node, context);
}
function convert_ast(ast) {
    const context = {
        local_variables: Object.create(null)
    };
    const result = new Array(ast.body.length);
    for(let i = 0; i < ast.body.length; ++i){
        //TODO: detect comments
        result[i] = convert_line(ast.body[i], context);
    }
    //TODO: detect comments...
    return result;
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
/* harmony export */   _b_: () => (/* reexport safe */ _core_modules_lists__WEBPACK_IMPORTED_MODULE_3__._b_),
/* harmony export */   _r_: () => (/* reexport safe */ _core_runtime_lists__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   ast2js: () => (/* reexport safe */ _ast2js__WEBPACK_IMPORTED_MODULE_1__.ast2js),
/* harmony export */   convert_ast: () => (/* reexport safe */ _py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_ast),
/* harmony export */   py2ast: () => (/* reexport safe */ _py2ast__WEBPACK_IMPORTED_MODULE_0__.py2ast)
/* harmony export */ });
/* harmony import */ var _py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./py2ast */ "./src/py2ast.ts");
/* harmony import */ var _ast2js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ast2js */ "./src/ast2js.ts");
/* harmony import */ var _core_runtime_lists__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core_runtime/lists */ "./src/core_runtime/lists.ts");
/* harmony import */ var _core_modules_lists__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core_modules/lists */ "./src/core_modules/lists.ts");





var __webpack_exports___b_ = __webpack_exports__._b_;
var __webpack_exports___r_ = __webpack_exports__._r_;
var __webpack_exports__ast2js = __webpack_exports__.ast2js;
var __webpack_exports__convert_ast = __webpack_exports__.convert_ast;
var __webpack_exports__py2ast = __webpack_exports__.py2ast;
export { __webpack_exports___b_ as _b_, __webpack_exports___r_ as _r_, __webpack_exports__ast2js as ast2js, __webpack_exports__convert_ast as convert_ast, __webpack_exports__py2ast as py2ast };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONkM7QUFDYjtBQUNvQjtBQUNYIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb21tZW50cy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbW1lbnRzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9mb3IvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9jb250cm9sZmxvd3MvZm9yL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy9pZmJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL2lmYmxvY2svYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvY29udHJvbGZsb3dzL3RyeWJsb2NrL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy93aGlsZS9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2NvbnRyb2xmbG93cy93aGlsZS9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvY2FsbC9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9jYWxsL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2Z1bmN0aW9ucy9kZWYvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9mdW5jdGlvbnMvZGVmL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMva2V5d29yZHMvcmFpc2UvcnVudGltZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9Ob25lL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Jvb2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9saXRlcmFscy9ib29sL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL2Zsb2F0L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvZmxvYXQvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvbGl0ZXJhbHMvaW50L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2xpdGVyYWxzL3N0ci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvKy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy8rL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy89L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz0vYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz09L2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvb3BlcmF0b3JzLz09L2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3Bhc3MvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9wYXNzL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3JldHVybi9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL3JldHVybi9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9zeW1ib2wvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX3J1bnRpbWUvRXhjZXB0aW9ucy9FeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9ydW50aW1lL2xpc3RzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfcnVudGltZS9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQVNUTm9kZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3QyanMoYXN0OiBBU1ROb2RlW10pIHtcblxuXHRsZXQganMgPSBcIlwiO1xuICAgIGxldCBjdXJzb3IgPSB7bGluZTogMSwgY29sOiAwfTtcblx0Zm9yKGxldCBub2RlIG9mIGFzdCkge1xuXHRcdGpzICs9IGFzdG5vZGUyanMobm9kZSwgY3Vyc29yKTtcbiAgICAgICAganMgKz0gICAgbmV3bGluZShub2RlLCBjdXJzb3IpO1xuICAgIH1cblxuXHRyZXR1cm4ganM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHIoc3RyOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uYXJnczphbnlbXSkge1xuICAgIHJldHVybiBbc3RyLCBhcmdzXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSlMoIHN0cjogUmV0dXJuVHlwZTx0eXBlb2Ygcj58c3RyaW5nfEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcyApIHtcblxuICAgIGlmKCB0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gc3RyLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgaWYoIHN0ciBpbnN0YW5jZW9mIEFTVE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGFzdG5vZGUyanMoc3RyLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGxldCBqcyA9IFwiXCI7XG5cbiAgICBsZXQgZTogYW55O1xuICAgIGxldCBzOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHN0clsxXS5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIHMgPSBzdHJbMF1baV07XG4gICAgICAgIGpzICs9IHM7XG4gICAgICAgIGN1cnNvci5jb2wgKz0gcy5sZW5ndGg7XG5cbiAgICAgICAgZSA9IHN0clsxXVtpXTtcbiAgICAgICAgaWYoIGUgaW5zdGFuY2VvZiBBU1ROb2RlKSB7XG4gICAgICAgICAgICBqcyArPSBhc3Rub2RlMmpzKGUsIGN1cnNvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzID0gYCR7ZX1gO1xuICAgICAgICAgICAganMgKz0gcztcbiAgICAgICAgICAgIGN1cnNvci5jb2wgKz0gcy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzID0gc3RyWzBdW3N0clsxXS5sZW5ndGhdO1xuICAgIGpzICs9IHM7XG4gICAgY3Vyc29yLmNvbCArPSBzLmxlbmd0aDtcblxuICAgIHJldHVybiBqcztcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gYm9keTJqcyhub2RlOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MsIGlkeCA9IDApIHtcbiAgICBcbiAgICBjb25zdCBzdGFydCA9IHsuLi5jdXJzb3J9O1xuXG4gICAgbGV0IGpzID0gXCJ7XCI7XG4gICAgY29uc3QgYm9keSA9IG5vZGUuY2hpbGRyZW5baWR4XTsvL2JvZHk6IEFTVE5vZGVbXTtcblxuICAgIC8vIGg0Y2sgZHVlIHRvIH0gZWxzZS9lbGlmIHtcbiAgICBjb25zdCBuZWVkc19vZmZzZXQgPSBbXCJjb250cm9sZmxvd3MuZWxzZVwiLCBcImNvbnRyb2xmbG93cy5lbGlmXCIsIFwiY29udHJvbGZsb3dzLmNhdGNoYmxvY2tcIl0uaW5jbHVkZXMobm9kZS50eXBlKTtcblxuICAgIGlmKG5lZWRzX29mZnNldClcbiAgICAgICAgLS1ub2RlLmpzY29kZSEuc3RhcnQuY29sO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGJvZHkuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAganMgKz0gbmV3bGluZShub2RlLCBjdXJzb3IsIDEpO1xuICAgICAgICBqcyArPSBhc3Rub2RlMmpzKGJvZHkuY2hpbGRyZW5baV0sIGN1cnNvcilcbiAgICB9XG5cbiAgICBqcyArPSBuZXdsaW5lKG5vZGUsIGN1cnNvcik7XG4gICAganMgKz0gXCJ9XCI7XG4gICAgY3Vyc29yLmNvbCArPSAxO1xuXG4gICAgLy8gaDRjayBkdWUgdG8gfSBlbHNlL2VsaWYvY2F0Y2gge1xuICAgICAgICBpZihuZWVkc19vZmZzZXQpXG4gICAgICAgICAgICArK25vZGUuanNjb2RlIS5zdGFydC5jb2w7XG5cbiAgICBib2R5LmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICBlbmQgIDogey4uLmN1cnNvcn1cbiAgICB9XG5cbiAgICByZXR1cm4ganM7XG59XG5cbi8vVE9ETzogbW92ZTJjb3JlX21vZHVsZXMgP1xuZXhwb3J0IGZ1bmN0aW9uIGFyZ3MyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgIGxldCBqcyA9IFwiKFwiO1xuICAgIGN1cnNvci5jb2wgKz0gMTtcblxuICAgIGNvbnN0IGFyZ3MgPSBub2RlLmNoaWxkcmVuWzBdO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgYXJncy5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiggaSAhPT0gMCkge1xuICAgICAgICAgICAganMgKz0gXCIsXCI7XG4gICAgICAgICAgICArK2N1cnNvci5jb2w7XG4gICAgICAgIH1cblxuICAgICAgICBqcyArPSBhcmcyanMoYXJncy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSBcIilcIjtcbiAgICBjdXJzb3IuY29sICs9IDE7XG5cbiAgICBhcmdzLmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICBlbmQgIDogey4uLmN1cnNvcn1cbiAgICB9XG5cbiAgICByZXR1cm4ganM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmcyanMobm9kZTogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgY29uc3Qgc3RhcnQgPSB7Li4uY3Vyc29yfTtcblxuICAgIGxldCBqcyA9IG5vZGUudmFsdWU7XG4gICAgY3Vyc29yLmNvbCArPSBqcy5sZW5ndGg7XG5cbiAgICBub2RlLmpzY29kZSA9IHtcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICBlbmQgIDogey4uLmN1cnNvcn1cbiAgICB9XG5cbiAgICByZXR1cm4ganM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdsaW5lKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcywgaW5kZW50X2xldmVsOiBudW1iZXIgPSAwKSB7XG5cbiAgICBjb25zdCBpbmRlbnQgPSBpbmRlbnRfbGV2ZWwqNCArIG5vZGUuanNjb2RlIS5zdGFydC5jb2w7XG5cbiAgICArK2N1cnNvci5saW5lO1xuICAgIGN1cnNvci5jb2wgPSBpbmRlbnQ7XG4gICAgcmV0dXJuIFwiXFxuXCIgKyBcIlwiLnBhZFN0YXJ0KGluZGVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3Rub2RlMmpzKG5vZGU6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiB7Li4uY3Vyc29yfSxcbiAgICAgICAgZW5kICA6IG51bGwgYXMgYW55XG4gICAgfVxuXG4gICAgbGV0IGpzID0gbm9kZS50b0pTIShjdXJzb3IpO1xuXG4gICAgbm9kZS5qc2NvZGUuZW5kID0gey4uLmN1cnNvcn1cbiAgICBcbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIF9jdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIC8vVE9ETy4uLlxuICAgIHJldHVybiBcIlwiOyAvL2Ake3RoaXMudmFsdWV9YDtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIHJldHVybjsgLy8gY3VycmVudGx5IGNvbW1lbnRzIGFyZW4ndCBpbmNsdWRlZCBpbiBCcnl0aG9uJ3MgQVNUXG5cbiAgICAvL2NvbnN0IGFzdG5vZGUgPSBuZXcgQVNUTm9kZShub2RlLCBcImxpdGVyYWxzLmJvb2xcIiwgbm9kZS52YWx1ZSk7XG4gICAgLy9hc3Rub2RlLnJlc3VsdF90eXBlID0gXCJib29sXCI7XG4gICAgLy9yZXR1cm4gYXN0bm9kZTtcbn0iLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZm9yKHJhbmdlKVwiKSB7XG5cbiAgICAgICAgbGV0IGJlZyA6IHN0cmluZ3xBU1ROb2RlICA9IFwiMG5cIjtcbiAgICAgICAgbGV0IGluY3I6IHN0cmluZ3xBU1ROb2RlID0gXCIxblwiO1xuICAgICAgICBsZXQgZW5kICA9IHRoaXMuY2hpbGRyZW5bMF07XG5cbiAgICAgICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgYmVnID0gdGhpcy5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIGVuZCA9IHRoaXMuY2hpbGRyZW5bMV07XG4gICAgICAgIH1cbiAgICAgICAgaWYoIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMylcbiAgICAgICAgICAgIGluY3IgPSB0aGlzLmNoaWxkcmVuWzJdO1xuXG4gICAgICAgIGxldCBqcyA9IHRvSlMocmBmb3IodmFyICR7dGhpcy52YWx1ZX0gPSAke2JlZ307ICR7dGhpcy52YWx1ZX0gPCAke2VuZH07ICR7dGhpcy52YWx1ZX0gKz0gJHtpbmNyfSlgLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgdGhpcy5jaGlsZHJlbi5sZW5ndGgtMSk7XG5cbiAgICAgICAgcmV0dXJuIGpzO1xuICAgIH1cblxuICAgIGxldCBqcyA9IHRvSlMocmBmb3IodmFyICR7dGhpcy52YWx1ZX0gb2YgdGhpcy5jaGlsZHJlblswXSlgLCBjdXJzb3IpO1xuICAgICAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gbm9kZS50YXJnZXQuaWQ7XG4gICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXNbdGFyZ2V0XSA9IG51bGw7IC8vVE9ET1xuXG4gICAgaWYoIG5vZGUuaXRlci5jb25zdHJ1Y3Rvci4kbmFtZSA9PT0gXCJDYWxsXCIgJiYgbm9kZS5pdGVyLmZ1bmMuaWQgPT09IFwicmFuZ2VcIikge1xuXG4gICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3IocmFuZ2UpXCIsIG51bGwsIHRhcmdldCwgW1xuICAgICAgICAgICAgLi4uIG5vZGUuaXRlci5hcmdzLm1hcCggKG46YW55KSA9PiBjb252ZXJ0X25vZGUobiwgY29udGV4dCkgKSxcbiAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICBdKTtcblxuICAgIH1cblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImNvbnRyb2xmbG93cy5mb3JcIiwgbnVsbCwgdGFyZ2V0LCBbXG4gICAgICAgIGNvbnZlcnRfbm9kZShub2RlLml0ZXIsIGNvbnRleHQpLFxuICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkZvclwiOyIsImltcG9ydCB7IGJvZHkyanMsIHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy50eXBlID09PSBcImNvbnRyb2xmbG93cy5pZmJsb2NrXCIpIHtcbiAgICAgICAgbGV0IGpzID0gXCJcIjtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBqcyArPSB0b0pTKHRoaXMuY2hpbGRyZW5baV0sIGN1cnNvcik7XG4gICAgICAgIHJldHVybiBqcztcbiAgICB9XG5cbiAgICAvL2lmXG4gICAgbGV0IGtleXdvcmQgPSBcImlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxpZlwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlIGlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxzZVwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlXCI7XG5cbiAgICBsZXQganMgPSB0b0pTKGtleXdvcmQsIGN1cnNvcik7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgaWYoIGtleXdvcmQgIT09IFwiZWxzZVwiKSB7XG4gICAgICAgIG9mZnNldCA9IDE7XG4gICAgICAgIGpzICs9IHRvSlMocmAoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCBvZmZzZXQpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfYm9keSwgY29udmVydF9saW5lLCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIFwiaWZibG9ja1wiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgaWYoIG5vZGUuaWZibG9jayA9PT0gXCJlbHNlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLiR7bm9kZS5pZmJsb2NrfWAsIG51bGwsIG51bGwsIFtcbiAgICAgICAgICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29uZCA9IGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpO1xuICAgICAgICBcbiAgICAgICAgaWYoY29uZC5yZXN1bHRfdHlwZSAhPT0gXCJib29sXCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFR5cGUgJHtjb25kLnJlc3VsdF90eXBlfSBub3QgeWV0IHN1cHBvcnRlZCBhcyBpZiBjb25kaXRpb25gKTtcblxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy4ke25vZGUuaWZibG9ja31gLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICBjb25kLFxuICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIG5vZGUuc2JyeXRob25fdHlwZSA9IFwiSWZcIjtcbiAgICBub2RlLmlmYmxvY2sgPSBcImlmXCI7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IFtcbiAgICAgICAgbm9kZVxuICAgIF07XG5cbiAgICBsZXQgY3VyID0gbm9kZTtcbiAgICB3aGlsZSggXCJvcmVsc2VcIiBpbiBjdXIgJiYgY3VyLm9yZWxzZS5sZW5ndGggPT09IDEgJiYgXCJ0ZXN0XCIgaW4gY3VyLm9yZWxzZVswXSkge1xuICAgICAgICBjdXIgPSBjdXIub3JlbHNlWzBdO1xuICAgICAgICBjdXIuc2JyeXRob25fdHlwZSA9IFwiSWZcIjtcbiAgICAgICAgY3VyLmlmYmxvY2sgPSBcImVsaWZcIjtcbiAgICAgICAgY2hpbGRyZW4ucHVzaChjdXIpO1xuICAgIH1cbiAgICBpZiggXCJvcmVsc2VcIiBpbiBjdXIgJiYgY3VyLm9yZWxzZS5sZW5ndGggIT09IDAgKSB7IC8vIGVsc2VcblxuICAgICAgICBsZXQgYmVnID0gY3VyLm9yZWxzZVswXTtcbiAgICAgICAgbGV0IGVuZCA9IGN1ci5vcmVsc2VbY3VyLm9yZWxzZS5sZW5ndGgtMV07XG5cbiAgICAgICAgY2hpbGRyZW4ucHVzaCh7XG4gICAgICAgICAgICBzYnJ5dGhvbl90eXBlOiBcIklmXCIsXG4gICAgICAgICAgICBpZmJsb2NrOiBcImVsc2VcIixcbiAgICAgICAgICAgIGJvZHkgICA6IGN1ci5vcmVsc2UsXG4gICAgICAgICAgICBsaW5lbm8gOiBiZWcubGluZW5vIC0gMSxcbiAgICAgICAgICAgIGNvbF9vZmZzZXQ6IG5vZGUuY29sX29mZnNldCxcbiAgICAgICAgICAgIGVuZF9saW5lbm86IGVuZC5lbmRfbGluZW5vLFxuICAgICAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGVuZC5lbmRfY29sX29mZnNldCxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuaWZibG9ja1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICAuLi5jaGlsZHJlbi5tYXAoIG4gPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICAgICAgXSk7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFzdG5vZGUuY2hpbGRyZW4ubGVuZ3RoLTE7ICsraSkge1xuICAgICAgICBjb25zdCBjYyA9IGFzdG5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW47XG4gICAgICAgIGFzdG5vZGUuY2hpbGRyZW5baV0ucHljb2RlLmVuZCA9IGNjW2NjLmxlbmd0aC0xXS5weWNvZGUuZW5kO1xuICAgIH1cblxuICAgIHJldHVybiBhc3Rub2RlO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiSWZcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCBuZXdsaW5lLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MudHJ5YmxvY2tcIikge1xuICAgICAgICBsZXQganMgPSBcIlwiO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICAgICAgcmV0dXJuIGpzO1xuICAgIH1cblxuICAgIGlmKCB0aGlzLnR5cGUgPT09IFwiY29udHJvbGZsb3dzLnRyeVwiKSB7XG4gICAgICAgIGxldCBqcyA9IHRvSlMoXCJ0cnlcIiwgY3Vyc29yKTtcbiAgICAgICAgICAgIGpzKz0gYm9keTJqcyh0aGlzLCBjdXJzb3IpO1xuICAgICAgICByZXR1cm4ganM7XG4gICAgfVxuXG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuY2F0Y2hibG9ja1wiKSB7XG4gICAgICAgIGxldCBqcyA9IHRvSlMoXCJjYXRjaChfZXJyXyl7XCIsIGN1cnNvcik7XG5cbiAgICAgICAganMrPSBuZXdsaW5lKHRoaXMsIGN1cnNvciwgMSk7XG4gICAgICAgIGpzKz0gdG9KUyhcImlmKHRydWUpe1wiLCBjdXJzb3IpOyAvL1RPRE8uLi5cblxuICAgICAgICAgICAganMgKz0gdG9KUyhcImNvbnNvbGUud2FybignZXhwJywgX2Vycl8pO1wiLCBjdXJzb3IpOyAvLyBkZWJ1Z1xuICAgICAgICAgICAgLy9UT0RPIGNhdGNoLi4uXG4gICAgICAgICAgICBqcys9IG5ld2xpbmUodGhpcywgY3Vyc29yLCAxKTtcbiAgICAgICAgICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCAwKTsgLy9UT0RPXG4gICAgICAgICAgICAvL1RPRE8gb25seSBpZiBubyBnZW5lcmFsIGNhdGNoLi4uXG4gICAgICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDEpO1xuICAgICAgICBqcys9IHRvSlMoXCJ9IGVsc2UgeyB0aHJvdyBfZXJyXyB9XCIsIGN1cnNvcik7XG5cbiAgICAgICAgLS10aGlzLmpzY29kZSEuc3RhcnQuY29sOyAvLyBoNGNrXG4gICAgICAgIGpzKz0gbmV3bGluZSh0aGlzLCBjdXJzb3IsIDApOyAvLyBtYWtlIG5ldyBsaW5lcyBoYW5kbGUgaXQgP1xuICAgICAgICAtLXRoaXMuanNjb2RlIS5zdGFydC5jb2w7IC8vIGg0Y2tcbiAgICAgICAganMrPSB0b0pTKFwifVwiLCBjdXJzb3IpO1xuICAgICAgICByZXR1cm4ganM7XG4gICAgfVxuXG4gICAgLypcbiAgICAvL2lmXG4gICAgbGV0IGtleXdvcmQgPSBcImlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxpZlwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlIGlmXCI7XG4gICAgaWYoIHRoaXMudHlwZSA9PT0gXCJjb250cm9sZmxvd3MuZWxzZVwiKVxuICAgICAgICBrZXl3b3JkID0gXCJlbHNlXCI7XG5cbiAgICBsZXQganMgPSB0b0pTKGtleXdvcmQsIGN1cnNvcik7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgaWYoIGtleXdvcmQgIT09IFwiZWxzZVwiKSB7XG4gICAgICAgIG9mZnNldCA9IDE7XG4gICAgICAgIGpzICs9IHRvSlMocmAoJHt0aGlzLmNoaWxkcmVuWzBdfSlgLCBjdXJzb3IpO1xuICAgIH1cblxuICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCBvZmZzZXQpO1xuXG4gICAgcmV0dXJuIGpzOyovXG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggXCJ0cnlibG9ja1wiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgaWYoIG5vZGUudHJ5YmxvY2sgPT09IFwidHJ5XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLiR7bm9kZS50cnlibG9ja31gLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiggbm9kZS50cnlibG9jayA9PT0gXCJjYXRjaGJsb2NrXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2JcIiwgbm9kZSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy4ke25vZGUudHJ5YmxvY2t9YCwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAgICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgICAgICAgICAgICAgIC8qIHRoaXMuaGFuZGxlcnMgKi8gLy9UT0RPLi4uXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5vZGUuc2JyeXRob25fdHlwZSA9IFwiVHJ5XCI7XG4gICAgbm9kZS50cnlibG9jayA9IFwidHJ5XCI7XG5cbiAgICAvL1RPRE8gbWFueSBleGNlcHRzLi4uXG4gICAgY29uc3QgY2F0Y2hibG9jayA9IHtcbiAgICAgICAgc2JyeXRob25fdHlwZTogXCJUcnlcIixcbiAgICAgICAgdHJ5YmxvY2sgICAgIDogXCJjYXRjaGJsb2NrXCIsXG4gICAgICAgIC4uLm5vZGUuaGFuZGxlcnNbMF0gLy9UT0RPLi4uXG4gICAgfTtcblxuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgIG5vZGUsXG4gICAgICAgIGNhdGNoYmxvY2tcbiAgICBdO1xuXG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MudHJ5YmxvY2tcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICAuLi5jaGlsZHJlbi5tYXAoIG4gPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICBdKTtcblxuICAgIC8vVE9ETzogZm9yIGZpcnN0IGNoaWxkLi4uXG4gICAgLypcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXN0bm9kZS5jaGlsZHJlbi5sZW5ndGgtMTsgKytpKSB7XG4gICAgICAgIGNvbnN0IGNjID0gYXN0bm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlbjtcbiAgICAgICAgYXN0bm9kZS5jaGlsZHJlbltpXS5weWNvZGUuZW5kID0gY2NbY2MubGVuZ3RoLTFdLnB5Y29kZS5lbmQ7XG4gICAgfSovXG5cbiAgICBjb25zb2xlLmxvZyhub2RlKTtcbiAgICByZXR1cm4gYXN0bm9kZTtcblxuICAgIC8vIG5vZGUuYm9keVxuICAgIC8vIGZpbmFsLmJvZHkgLy8gb3JlbHNlXG4gICAgLy8gaGFuZGxlcnMgW11cbi8qXG4gICAgaWYoIFwiaWZibG9ja1wiIGluIG5vZGUgKSB7XG5cbiAgICAgICAgaWYoIG5vZGUuaWZibG9jayA9PT0gXCJlbHNlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBgY29udHJvbGZsb3dzLiR7bm9kZS5pZmJsb2NrfWAsIG51bGwsIG51bGwsIFtcbiAgICAgICAgICAgICAgICBjb252ZXJ0X2JvZHkobm9kZSwgY29udGV4dClcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29uZCA9IGNvbnZlcnRfbm9kZShub2RlLnRlc3QsIGNvbnRleHQpO1xuICAgICAgICBcbiAgICAgICAgaWYoY29uZC5yZXN1bHRfdHlwZSAhPT0gXCJib29sXCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFR5cGUgJHtjb25kLnJlc3VsdF90eXBlfSBub3QgeWV0IHN1cHBvcnRlZCBhcyBpZiBjb25kaXRpb25gKTtcblxuICAgICAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgYGNvbnRyb2xmbG93cy4ke25vZGUuaWZibG9ja31gLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICBjb25kLFxuICAgICAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIG5vZGUuc2JyeXRob25fdHlwZSA9IFwiSWZcIjtcbiAgICBub2RlLmlmYmxvY2sgPSBcImlmXCI7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IFtcbiAgICAgICAgbm9kZVxuICAgIF07XG5cbiAgICBsZXQgY3VyID0gbm9kZTtcbiAgICB3aGlsZSggXCJvcmVsc2VcIiBpbiBjdXIgJiYgY3VyLm9yZWxzZS5sZW5ndGggPT09IDEgJiYgXCJ0ZXN0XCIgaW4gY3VyLm9yZWxzZVswXSkge1xuICAgICAgICBjdXIgPSBjdXIub3JlbHNlWzBdO1xuICAgICAgICBjdXIuc2JyeXRob25fdHlwZSA9IFwiSWZcIjtcbiAgICAgICAgY3VyLmlmYmxvY2sgPSBcImVsaWZcIjtcbiAgICAgICAgY2hpbGRyZW4ucHVzaChjdXIpO1xuICAgIH1cbiAgICBpZiggXCJvcmVsc2VcIiBpbiBjdXIgJiYgY3VyLm9yZWxzZS5sZW5ndGggIT09IDAgKSB7IC8vIGVsc2VcblxuICAgICAgICBsZXQgYmVnID0gY3VyLm9yZWxzZVswXTtcbiAgICAgICAgbGV0IGVuZCA9IGN1ci5vcmVsc2VbY3VyLm9yZWxzZS5sZW5ndGgtMV07XG5cbiAgICAgICAgY2hpbGRyZW4ucHVzaCh7XG4gICAgICAgICAgICBzYnJ5dGhvbl90eXBlOiBcIklmXCIsXG4gICAgICAgICAgICBpZmJsb2NrOiBcImVsc2VcIixcbiAgICAgICAgICAgIGJvZHkgICA6IGN1ci5vcmVsc2UsXG4gICAgICAgICAgICBsaW5lbm8gOiBiZWcubGluZW5vIC0gMSxcbiAgICAgICAgICAgIGNvbF9vZmZzZXQ6IG5vZGUuY29sX29mZnNldCxcbiAgICAgICAgICAgIGVuZF9saW5lbm86IGVuZC5lbmRfbGluZW5vLFxuICAgICAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGVuZC5lbmRfY29sX29mZnNldCxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBhc3Rub2RlID0gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3MuaWZibG9ja1wiLCBudWxsLCBudWxsLCBbXG4gICAgICAgICAgICAuLi5jaGlsZHJlbi5tYXAoIG4gPT4gY29udmVydF9ub2RlKG4sIGNvbnRleHQpIClcbiAgICAgICAgXSk7XG4gICAgXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFzdG5vZGUuY2hpbGRyZW4ubGVuZ3RoLTE7ICsraSkge1xuICAgICAgICBjb25zdCBjYyA9IGFzdG5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW47XG4gICAgICAgIGFzdG5vZGUuY2hpbGRyZW5baV0ucHljb2RlLmVuZCA9IGNjW2NjLmxlbmd0aC0xXS5weWNvZGUuZW5kO1xuICAgIH1cblxuICAgIHJldHVybiBhc3Rub2RlOyovXG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJUcnlcIjsiLCJpbXBvcnQgeyBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhyYHdoaWxlKCR7dGhpcy5jaGlsZHJlblswXX0pYCwgY3Vyc29yKTtcbiAgICBqcyArPSBib2R5MmpzKHRoaXMsIGN1cnNvciwgMSk7XG5cbiAgICByZXR1cm4ganM7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ib2R5LCBjb252ZXJ0X2xpbmUsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJjb250cm9sZmxvd3Mud2hpbGVcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS50ZXN0LCBjb250ZXh0KSxcbiAgICAgICAgY29udmVydF9ib2R5KG5vZGUsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJXaGlsZVwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBsZXQganMgPSBcIlwiO1xuICAgIGlmKCB0aGlzLmNoaWxkcmVuWzBdLnJlc3VsdF90eXBlPy5zdGFydHNXaXRoKFwiY2xhc3MuXCIpIClcbiAgICAgICAganMrPSB0b0pTKFwibmV3IFwiLCBjdXJzb3IpO1xuICAgIFxuICAgIGpzICs9IHRvSlMocmAke3RoaXMuY2hpbGRyZW5bMF19KGAsIGN1cnNvcik7XG5cbiAgICAvL1RPRE86IGFyZ3Mgbm9kZS4uLlxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgaWYoIGkgIT09IDEpXG4gICAgICAgICAgICBqcyArPSB0b0pTKFwiLCBcIiwgY3Vyc29yKTtcbiAgICAgICAgXG4gICAgICAgIGpzICs9IHRvSlModGhpcy5jaGlsZHJlbltpXSwgY3Vyc29yKTtcbiAgICB9XG5cbiAgICBqcyArPSB0b0pTKFwiKVwiLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICAvLyBUT0RPOiBub2RlLmFyZ3MgLy8gZmN0IGNhbGwgYXJndW1lbnQuXG4gICAgLy8gVE9ETzogdGhpcyA/XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiZnVuY3Rpb25zLmNhbGxcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5mdW5jLCBjb250ZXh0ICksXG4gICAgICAgIC4uLm5vZGUuYXJncy5tYXAoIChlOmFueSkgPT4gY29udmVydF9ub2RlKGUsIGNvbnRleHQpIClcbiAgICBdKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNhbGxcIjsiLCJpbXBvcnQgeyBhcmdzMmpzLCBib2R5MmpzLCByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgbGV0IGpzID0gdG9KUyhyYGZ1bmN0aW9uICR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xuXG4gICAganMgKz0gYXJnczJqcyh0aGlzLCBjdXJzb3IpO1xuICAgIGpzICs9IGJvZHkyanModGhpcywgY3Vyc29yLCAxKTtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X2FyZ3MsIGNvbnZlcnRfYm9keSwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGNvbnN0IGFyZ3MgPSBjb252ZXJ0X2FyZ3Mobm9kZSwgY29udGV4dCk7XG5cbiAgICAvLyBuZXcgY29udGV4dCBmb3IgdGhlIGZ1bmN0aW9uIGxvY2FsIHZhcmlhYmxlc1xuICAgIGNvbnRleHQgPSB7XG4gICAgICAgIC4uLmNvbnRleHRcbiAgICB9XG4gICAgY29udGV4dC5sb2NhbF92YXJpYWJsZXMgPSB7Li4uY29udGV4dC5sb2NhbF92YXJpYWJsZXN9O1xuICAgIGZvcihsZXQgYXJnIG9mIGFyZ3MuY2hpbGRyZW4pXG4gICAgICAgIGNvbnRleHQubG9jYWxfdmFyaWFibGVzW2FyZy52YWx1ZV0gPSBhcmcucmVzdWx0X3R5cGU7XG5cbiAgICAvLyByZXR1cm4gdHlwZS4uLiBub2RlLnJldHVybnMuaWRcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImZ1bmN0aW9ucy5kZWZcIiwgbnVsbCwgbm9kZS5uYW1lLCBbXG4gICAgICAgIGFyZ3MsXG4gICAgICAgIGNvbnZlcnRfYm9keShub2RlLCBjb250ZXh0KVxuICAgIF0pO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiRnVuY3Rpb25EZWZcIjsiLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuXG4gICAgcmV0dXJuIHRvSlMocmB0aHJvdyBuZXcgX2JfLlB5dGhvbkVycm9yKCR7dGhpcy5jaGlsZHJlblswXX0pO2AsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCwgY29udmVydF9ub2RlIH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpIHtcblxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwia2V5d29yZHMucmFpc2VcIiwgbnVsbCwgbnVsbCwgW1xuICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5leGMsIGNvbnRleHQpXG4gICAgXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJSYWlzZVwiOyIsImV4cG9ydCBjbGFzcyBQeXRob25FcnJvciB7XG5cbiAgICByZWFkb25seSBweXRob25fZXhjZXB0aW9uOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihweXRob25fZXhjZXB0aW9uOiBhbnkpIHtcbiAgICAgICAgdGhpcy5weXRob25fZXhjZXB0aW9uID0gcHl0aG9uX2V4Y2VwdGlvbjtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIFB5dGhvbkVycm9yXG59OyIsImltcG9ydCBBU1RfQ09OVkVSVF8wIGZyb20gXCIuL3N5bWJvbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMCBmcm9tIFwiLi9zeW1ib2wvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMSBmcm9tIFwiLi9yZXR1cm4vYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEgZnJvbSBcIi4vcmV0dXJuL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzIgZnJvbSBcIi4vcGFzcy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMiBmcm9tIFwiLi9wYXNzL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzMgZnJvbSBcIi4vb3BlcmF0b3JzLz09L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18zIGZyb20gXCIuL29wZXJhdG9ycy89PS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF80IGZyb20gXCIuL29wZXJhdG9ycy89L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU180IGZyb20gXCIuL29wZXJhdG9ycy89L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzUgZnJvbSBcIi4vb3BlcmF0b3JzLysvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzUgZnJvbSBcIi4vb3BlcmF0b3JzLysvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfNiBmcm9tIFwiLi9saXRlcmFscy9zdHIvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzYgZnJvbSBcIi4vbGl0ZXJhbHMvc3RyL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzcgZnJvbSBcIi4vbGl0ZXJhbHMvaW50L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU183IGZyb20gXCIuL2xpdGVyYWxzL2ludC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF84IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU184IGZyb20gXCIuL2xpdGVyYWxzL2Zsb2F0L2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzkgZnJvbSBcIi4vbGl0ZXJhbHMvYm9vbC9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfOSBmcm9tIFwiLi9saXRlcmFscy9ib29sL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEwIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzEwIGZyb20gXCIuL2xpdGVyYWxzL05vbmUvYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTEgZnJvbSBcIi4va2V5d29yZHMvcmFpc2UvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzExIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL2FzdDJqcy50c1wiO1xuaW1wb3J0ICAgICBSVU5USU1FXzExIGZyb20gXCIuL2tleXdvcmRzL3JhaXNlL3J1bnRpbWUudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xMiBmcm9tIFwiLi9mdW5jdGlvbnMvZGVmL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMiBmcm9tIFwiLi9mdW5jdGlvbnMvZGVmL2FzdDJqcy50c1wiO1xuaW1wb3J0IEFTVF9DT05WRVJUXzEzIGZyb20gXCIuL2Z1bmN0aW9ucy9jYWxsL2FzdGNvbnZlcnQudHNcIjtcbmltcG9ydCAgICAgIEFTVDJKU18xMyBmcm9tIFwiLi9mdW5jdGlvbnMvY2FsbC9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNCBmcm9tIFwiLi9jb250cm9sZmxvd3Mvd2hpbGUvYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE0IGZyb20gXCIuL2NvbnRyb2xmbG93cy93aGlsZS9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNSBmcm9tIFwiLi9jb250cm9sZmxvd3MvdHJ5YmxvY2svYXN0Y29udmVydC50c1wiO1xuaW1wb3J0ICAgICAgQVNUMkpTXzE1IGZyb20gXCIuL2NvbnRyb2xmbG93cy90cnlibG9jay9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xNiBmcm9tIFwiLi9jb250cm9sZmxvd3MvaWZibG9jay9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTYgZnJvbSBcIi4vY29udHJvbGZsb3dzL2lmYmxvY2svYXN0MmpzLnRzXCI7XG5pbXBvcnQgQVNUX0NPTlZFUlRfMTcgZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvci9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTcgZnJvbSBcIi4vY29udHJvbGZsb3dzL2Zvci9hc3QyanMudHNcIjtcbmltcG9ydCBBU1RfQ09OVkVSVF8xOCBmcm9tIFwiLi9jb21tZW50cy9hc3Rjb252ZXJ0LnRzXCI7XG5pbXBvcnQgICAgICBBU1QySlNfMTggZnJvbSBcIi4vY29tbWVudHMvYXN0MmpzLnRzXCI7XG5cblxuY29uc3QgTU9EVUxFUyA9IHtcblx0XCJzeW1ib2xcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8wLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18wXG5cdH0sXG5cdFwicmV0dXJuXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMVxuXHR9LFxuXHRcInBhc3NcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8yLFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18yXG5cdH0sXG5cdFwib3BlcmF0b3JzLj09XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfM1xuXHR9LFxuXHRcIm9wZXJhdG9ycy49XCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNFxuXHR9LFxuXHRcIm9wZXJhdG9ycy4rXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfNVxuXHR9LFxuXHRcImxpdGVyYWxzLnN0clwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzYsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzZcblx0fSxcblx0XCJsaXRlcmFscy5pbnRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF83LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU183XG5cdH0sXG5cdFwibGl0ZXJhbHMuZmxvYXRcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF84LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU184XG5cdH0sXG5cdFwibGl0ZXJhbHMuYm9vbFwiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzksXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzlcblx0fSxcblx0XCJsaXRlcmFscy5Ob25lXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTAsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEwXG5cdH0sXG5cdFwia2V5d29yZHMucmFpc2VcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTFcblx0fSxcblx0XCJmdW5jdGlvbnMuZGVmXCI6IHtcblx0XHRBU1RfQ09OVkVSVDogQVNUX0NPTlZFUlRfMTIsXG5cdFx0ICAgICBBU1QySlM6ICAgICAgQVNUMkpTXzEyXG5cdH0sXG5cdFwiZnVuY3Rpb25zLmNhbGxcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xMyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTNcblx0fSxcblx0XCJjb250cm9sZmxvd3Mud2hpbGVcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNCxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTRcblx0fSxcblx0XCJjb250cm9sZmxvd3MudHJ5YmxvY2tcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNSxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTVcblx0fSxcblx0XCJjb250cm9sZmxvd3MuaWZibG9ja1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE2LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xNlxuXHR9LFxuXHRcImNvbnRyb2xmbG93cy5mb3JcIjoge1xuXHRcdEFTVF9DT05WRVJUOiBBU1RfQ09OVkVSVF8xNyxcblx0XHQgICAgIEFTVDJKUzogICAgICBBU1QySlNfMTdcblx0fSxcblx0XCJjb21tZW50c1wiOiB7XG5cdFx0QVNUX0NPTlZFUlQ6IEFTVF9DT05WRVJUXzE4LFxuXHRcdCAgICAgQVNUMkpTOiAgICAgIEFTVDJKU18xOFxuXHR9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBNT0RVTEVTO1xuXG5cbmNvbnN0IFJVTlRJTUUgPSB7fTtcbk9iamVjdC5hc3NpZ24oUlVOVElNRSwgUlVOVElNRV8xMSk7XG5cblxuZXhwb3J0IGNvbnN0IF9iXyA9IFJVTlRJTUU7XG4iLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMocmAke3RoaXMudmFsdWV9YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggISAodHlwZW9mIG5vZGUudmFsdWUgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICB8fCAhKFwiX19jbGFzc19fXCIgaW4gbm9kZS52YWx1ZSlcbiAgICAgICAgICAgIHx8IG5vZGUudmFsdWUuX19jbGFzc19fLl9fcXVhbG5hbWVfXyAhPT0gXCJOb25lVHlwZVwiIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuTm9uZVwiLCBcIk5vbmVcIiwgbnVsbCk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1gLCBjdXJzb3IpO1xufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgX2NvbnRleHQ6IENvbnRleHQpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJib29sZWFuXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5ib29sXCIsIFwiYm9vbFwiLCBub2RlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLnZhbHVlfWAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKG5vZGUudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHx8IG5vZGUudmFsdWUuX19jbGFzc19fPy5fX3F1YWxuYW1lX18gIT09IFwiZmxvYXRcIilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwibGl0ZXJhbHMuZmxvYXRcIiwgXCJmbG9hdFwiLCBub2RlLnZhbHVlLnZhbHVlKTtcbn1cblxuY29udmVydC5icnl0aG9uX25hbWUgPSBcIkNvbnN0YW50XCI7IiwiaW1wb3J0IHsgciwgdG9KUyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUsIENvZGVQb3MgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlLCBjdXJzb3I6IENvZGVQb3MpIHtcbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy52YWx1ZX1uYCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwibnVtYmVyXCIgKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5pbnRcIiwgXCJpbnRcIiwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMocmBcIiR7dGhpcy52YWx1ZX1cImAsIGN1cnNvcik7XG59IiwiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBfY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoIHR5cGVvZiBub2RlLnZhbHVlICE9PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJsaXRlcmFscy5zdHJcIiwgXCJzdHJcIiwgbm9kZS52YWx1ZSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJDb25zdGFudFwiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICByZXR1cm4gdG9KUyhyYCR7dGhpcy5jaGlsZHJlblswXX0gKyAke3RoaXMuY2hpbGRyZW5bMV19YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgaWYoICEgKFwib3BcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybjtcblxuICAgIGxldCBvcCA9IG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWU7XG4gICAgaWYoIG9wID09PSBcIkFkZFwiKVxuICAgICAgICBvcCA9IFwiK1wiO1xuXG4gICAgaWYoIG9wID09PSBcIkVxXCIpXG4gICAgICAgIHJldHVybjtcblxuICAgIC8vVE9ETy4uLlxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIm9wZXJhdG9ycy4rXCIsIG51bGwsIG9wLFxuICAgICAgICBbXG4gICAgICAgICAgICBjb252ZXJ0X25vZGUobm9kZS5sZWZ0ICwgY29udGV4dCApLFxuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUucmlnaHQsIGNvbnRleHQpLFxuICAgICAgICBdXG4gICAgKTtcbn0iLCJpbXBvcnQgeyByLCB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIFxuICAgIGxldCBqcyA9IFwiXCI7XG4gICAgaWYoIHRoaXMudHlwZS5lbmRzV2l0aChcIihpbml0KVwiKSApXG4gICAgICAgIGpzICs9IHRvSlMoXCJ2YXIgXCIsIGN1cnNvcik7XG5cbiAgICBqcyArPSB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfSA9ICR7dGhpcy5jaGlsZHJlblsxXX1gLCBjdXJzb3IpO1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IENvbnRleHQsIGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55LCBjb250ZXh0OiBDb250ZXh0KSB7XG5cbiAgICBsZXQgdGFyZ2V0ID0gbm9kZS50YXJnZXQ7XG4gICAgaWYoIFwidGFyZ2V0c1wiIGluIG5vZGUpXG4gICAgICAgIHRhcmdldCA9IG5vZGUudGFyZ2V0c1swXTtcblxuICAgIGNvbnN0IGxlZnQgID0gY29udmVydF9ub2RlKHRhcmdldCwgY29udGV4dCApO1xuICAgIGNvbnN0IHJpZ2h0ID0gY29udmVydF9ub2RlKG5vZGUudmFsdWUsICAgICAgY29udGV4dCk7XG5cbiAgICBsZXQgcmlnaHRfdHlwZTogc3RyaW5nfG51bGwgPSByaWdodC5yZXN1bHRfdHlwZTtcbiAgICBpZiggXCJhbm5vdGF0aW9uXCIgaW4gbm9kZSkge1xuICAgICAgICByaWdodF90eXBlID0gbm9kZS5hbm5vdGF0aW9uLmlkID8/IFwiTm9uZVwiO1xuICAgICAgICBpZiggcmlnaHQucmVzdWx0X3R5cGUgIT09IG51bGwgJiYgcmlnaHQucmVzdWx0X3R5cGUgIT09IHJpZ2h0X3R5cGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXcm9uZyByZXN1bHRfdHlwZVwiKTtcbiAgICB9XG5cbiAgICBsZXQgdHlwZSA9IFwib3BlcmF0b3JzLj1cIjtcblxuICAgIGlmKCBsZWZ0LnR5cGUgPT09IFwic3ltYm9sXCIpIHtcblxuICAgICAgICAvLyBpZiBleGlzdHMsIGVuc3VyZSB0eXBlLlxuICAgICAgICBpZiggbGVmdC52YWx1ZSBpbiBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlcykge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0X3R5cGUgPSBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tsZWZ0LnZhbHVlXTtcbiAgICAgICAgICAgIGlmKCByZXN1bHRfdHlwZSAhPT0gbnVsbCAmJiByaWdodF90eXBlICE9PSByZXN1bHRfdHlwZSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXcm9uZyByZXN1bHRfdHlwZVwiKTtcblxuICAgICAgICAgICAgLy8gYW5ub3RhdGlvbl90eXBlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZXh0LmxvY2FsX3ZhcmlhYmxlc1tsZWZ0LnZhbHVlXSA9IHJpZ2h0X3R5cGU7XG4gICAgICAgICAgICB0eXBlICs9IFwiKGluaXQpXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIHR5cGUsIHJpZ2h0X3R5cGUsIG51bGwsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICByaWdodCxcbiAgICAgICAgXVxuICAgICk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gW1wiQXNzaWduXCIsIFwiQW5uQXNzaWduXCJdOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgXG4gICAgLy9UT0RPIE5vbmUgdHlwZS4uLlxuICAgIC8vVE9ETyBzdHJcblxuICAgIHJldHVybiB0b0pTKHJgJHt0aGlzLmNoaWxkcmVuWzBdfSA9PSAke3RoaXMuY2hpbGRyZW5bMV19YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbGVmdCAgPSBjb252ZXJ0X25vZGUobm9kZS5sZWZ0LCBjb250ZXh0ICk7XG4gICAgY29uc3QgcmlnaHQgPSBjb252ZXJ0X25vZGUobm9kZS5jb21wYXJhdG9yc1swXSwgY29udGV4dCk7XG5cbiAgICBpZihsZWZ0LnJlc3VsdF90eXBlID09PSBudWxsIHx8IHJpZ2h0LnJlc3VsdF90eXBlID09PSBudWxsKSB7XG4gICAgICAgIC8vVE9ETzogb2JqZWN0IHJlc3VsdF90eXBlIHRvby4uLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwib3BlcmF0b3JzLj09XCIsIFwiYm9vbFwiLCBudWxsLFxuICAgICAgICBbXG4gICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgcmlnaHQsXG4gICAgICAgIF1cbiAgICApO1xufVxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiQ29tcGFyZVwiOyIsImltcG9ydCB7IHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG4gICAgcmV0dXJuIHRvSlMoXCIvKiBub3QgaW1wbGVtZW50ZWQgKi9cIiwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInB5MmFzdFwiO1xuaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnksIF9jb250ZXh0OiBDb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwicGFzc1wiLCBudWxsKTtcbn1cblxuXG5jb252ZXJ0LmJyeXRob25fbmFtZSA9IFwiUGFzc1wiOyIsImltcG9ydCB7IHIsIHRvSlMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSB7XG5cbiAgICBpZiggdGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiB0b0pTKFwicmV0dXJuXCIsIGN1cnNvcik7XG5cbiAgICByZXR1cm4gdG9KUyhyYHJldHVybiAke3RoaXMuY2hpbGRyZW5bMF19YCwgY3Vyc29yKTtcbn0iLCJpbXBvcnQgeyBDb250ZXh0LCBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuICAgIFxuICAgIGlmKG5vZGUudmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwicmV0dXJuXCIsIFwiTm9uZVwiLCBudWxsKTtcblxuICAgIGNvbnN0IGV4cHIgPSBjb252ZXJ0X25vZGUobm9kZS52YWx1ZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwicmV0dXJuXCIsIGV4cHIucmVzdWx0X3R5cGUsIG51bGwsIFtleHByXSk7XG59XG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJSZXR1cm5cIjsiLCJpbXBvcnQgeyB0b0pTIH0gZnJvbSBcImFzdDJqc1wiO1xuaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXN0MmpzKHRoaXM6IEFTVE5vZGUsIGN1cnNvcjogQ29kZVBvcykge1xuICAgIHJldHVybiB0b0pTKHRoaXMudmFsdWUsIGN1cnNvcik7IC8vVE9ET1xufSIsImltcG9ydCBfcl8gZnJvbSBcIi4uLy4uL2NvcmVfcnVudGltZS9saXN0c1wiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmZ1bmN0aW9uIGlzQ2xhc3MoXzogdW5rbm93bikge1xuICAgIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgbGV0IHJlc3VsdF90eXBlID0gbnVsbDtcbiAgICBsZXQgdmFsdWUgPSBub2RlLmlkO1xuXG4gICAgaWYoIG5vZGUuaWQgaW4gY29udGV4dC5sb2NhbF92YXJpYWJsZXMpXG4gICAgICAgIHJlc3VsdF90eXBlID0gY29udGV4dC5sb2NhbF92YXJpYWJsZXNbbm9kZS5pZF07XG4gICAgZWxzZSBpZihub2RlLmlkIGluIF9yXykge1xuICAgICAgICB2YWx1ZSA9IGBfcl8uJHtub2RlLmlkfWA7XG4gICAgICAgIGlmKCBpc0NsYXNzKF9yX1tub2RlLmlkIGFzIGtleW9mIHR5cGVvZiBfcl9dKSApXG4gICAgICAgICAgICByZXN1bHRfdHlwZSA9IGBjbGFzcy4ke25vZGUuaWR9YDtcbiAgICB9XG5cbiAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcInN5bWJvbFwiLCByZXN1bHRfdHlwZSwgdmFsdWUpO1xufVxuXG5cbmNvbnZlcnQuYnJ5dGhvbl9uYW1lID0gXCJOYW1lXCI7IiwiaW1wb3J0IFB5X29iamVjdCBmcm9tIFwiY29yZV9ydW50aW1lL29iamVjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQeV9FeGNlcHRpb24gZXh0ZW5kcyBQeV9vYmplY3Qge1xuXG59IiwiaW1wb3J0IFJVTlRJTUVfMCBmcm9tIFwiLi9vYmplY3QudHNcIjtcbmltcG9ydCBSVU5USU1FXzEgZnJvbSBcIi4vRXhjZXB0aW9ucy9FeGNlcHRpb24udHNcIjtcblxuXG5jb25zdCBSVU5USU1FID0ge1xuXHRcIm9iamVjdFwiOiBSVU5USU1FXzAsXG5cdFwiRXhjZXB0aW9uXCI6IFJVTlRJTUVfMSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgUlVOVElNRTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFB5X29iamVjdCB7XG5cbn0iLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHtBU1ROb2RlfSBmcm9tIFwiLi9zdHJ1Y3RzL0FTVE5vZGVcIjtcblxuaW1wb3J0IENPUkVfTU9EVUxFUyBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjtcblxuXG5jb25zdCBtb2R1bGVzOiBSZWNvcmQ8c3RyaW5nLCAodHlwZW9mIENPUkVfTU9EVUxFUylba2V5b2YgdHlwZW9mIENPUkVfTU9EVUxFU11bXT4gPSB7fVxuXG5mb3IobGV0IG1vZHVsZV9uYW1lIGluIENPUkVfTU9EVUxFUykge1xuXG4gICAgY29uc3QgbW9kdWxlID0gQ09SRV9NT0RVTEVTW21vZHVsZV9uYW1lIGFzIGtleW9mIHR5cGVvZiBDT1JFX01PRFVMRVNdO1xuXG4gICAgbGV0IG5hbWVzID0gW1wibnVsbFwiXTtcbiAgICBpZiggXCJicnl0aG9uX25hbWVcIiBpbiBtb2R1bGUuQVNUX0NPTlZFUlQpIHtcblxuICAgICAgICBpZiggQXJyYXkuaXNBcnJheShtb2R1bGUuQVNUX0NPTlZFUlQuYnJ5dGhvbl9uYW1lKSApIHtcbiAgICAgICAgICAgIG5hbWVzID0gbW9kdWxlLkFTVF9DT05WRVJULmJyeXRob25fbmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hbWVzID0gW21vZHVsZS5BU1RfQ09OVkVSVC5icnl0aG9uX25hbWVdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IobGV0IG5hbWUgb2YgbmFtZXMpXG4gICAgICAgIChtb2R1bGVzW25hbWVdID8/PSBbXSkucHVzaChtb2R1bGUpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nKSB7XG5cbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIFwiZmlsZW5hbWVcIiwgJ2ZpbGUnKTtcblx0Y29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICAvL2NvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXG5cdHJldHVybiBjb252ZXJ0X2FzdChfYXN0KTsgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbm9kZShicnl0aG9uX25vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5hbWUgPSBicnl0aG9uX25vZGUuc2JyeXRob25fdHlwZSA/PyBicnl0aG9uX25vZGUuY29uc3RydWN0b3IuJG5hbWU7XG5cbiAgICBpZiggIShuYW1lIGluIG1vZHVsZXMpICkge1xuICAgICAgICBjb25zb2xlLmxvZyggYnJ5dGhvbl9ub2RlIClcbiAgICAgICAgY29uc29sZS53YXJuKFwiTW9kdWxlIG5vdCByZWdpc3RlcmVkXCIsIG5hbWUpO1xuICAgICAgICBuYW1lID0gXCJudWxsXCJcbiAgICB9XG5cbiAgICBmb3IobGV0IG1vZHVsZSBvZiBtb2R1bGVzW25hbWVdKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG1vZHVsZS5BU1RfQ09OVkVSVChicnl0aG9uX25vZGUsIGNvbnRleHQpO1xuICAgICAgICBpZihyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0LnRvSlMgPSBtb2R1bGUuQVNUMkpTO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgZm9yKGxldCBtb2R1bGVfbmFtZSBpbiBDT1JFX01PRFVMRVMpIHtcbiAgICAgICAgY29uc3QgbW9kdWxlID0gQ09SRV9NT0RVTEVTW21vZHVsZV9uYW1lIGFzIGtleW9mIHR5cGVvZiBDT1JFX01PRFVMRVNdO1xuICAgICAgICBsZXQgcmVzdWx0ID0gbW9kdWxlLkFTVF9DT05WRVJUKGJyeXRob25fbm9kZSwgY29udGV4dCk7XG4gICAgICAgIGlmKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHQudG9KUyA9IG1vZHVsZS5BU1QySlM7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgICovXG5cbiAgICBjb25zb2xlLmVycm9yKGJyeXRob25fbm9kZSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgbm9kZVwiKTtcbn1cblxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9ib2R5KG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgbGluZXMgPSBub2RlLmJvZHkubWFwKCAobTphbnkpID0+IGNvbnZlcnRfbGluZShtLCBjb250ZXh0KSApO1xuICAgIGNvbnN0IGxhc3QgPSBub2RlLmJvZHlbbm9kZS5ib2R5Lmxlbmd0aC0xXTtcblxuICAgIGNvbnN0IHZpcnRfbm9kZSA9IHtcbiAgICAgICAgbGluZW5vICAgIDogbm9kZS5ib2R5WzBdLmxpbmVubyxcbiAgICAgICAgY29sX29mZnNldDogbm9kZS5ib2R5WzBdLmNvbF9vZmZzZXQsXG5cbiAgICAgICAgZW5kX2xpbmVubyAgICA6IGxhc3QuZW5kX2xpbmVubyxcbiAgICAgICAgZW5kX2NvbF9vZmZzZXQ6IGxhc3QuZW5kX2NvbF9vZmZzZXRcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUodmlydF9ub2RlLCBcImJvZHlcIiwgbnVsbCwgbnVsbCwgbGluZXMpO1xufVxuLy9UT0RPOiBtb3ZlMmNvcmVfbW9kdWxlcyA/XG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hcmdzKG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgY29uc3QgYXJncyA9IG5vZGUuYXJncy5hcmdzLm1hcCggKG06YW55KSA9PiBjb252ZXJ0X2FyZyhtLCBjb250ZXh0KSApOyAvL1RPRE8uLi5cbiAgICBcbiAgICBsZXQgZmlyc3Q6IGFueTtcbiAgICBsZXQgbGFzdCA6IGFueTtcbiAgICBpZiggYXJncy5sZW5ndGggIT09IDApIHtcblxuICAgICAgICBmaXJzdD0gbm9kZS5hcmdzLmFyZ3NbMF07XG4gICAgICAgIGxhc3QgPSBub2RlLmFyZ3MuYXJnc1tub2RlLmFyZ3MuYXJncy5sZW5ndGgtMV07XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhbiBlc3RpbWF0aW9uLi4uXG4gICAgICAgIGNvbnN0IGNvbCA9IG5vZGUuY29sX29mZnNldCArIDQgKyBub2RlLm5hbWUubGVuZ3RoICsgMTtcblxuICAgICAgICBmaXJzdCA9IGxhc3QgPSB7XG4gICAgICAgICAgICBsaW5lbm86IG5vZGUubGluZW5vLFxuICAgICAgICAgICAgZW5kX2xpbmVubzogbm9kZS5saW5lbm8sXG4gICAgICAgICAgICBjb2xfb2Zmc2V0OiBjb2wsXG4gICAgICAgICAgICBlbmRfY29sX29mZnNldDogY29sXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IHZpcnRfbm9kZSA9IHtcbiAgICAgICAgbGluZW5vICAgIDogZmlyc3QubGluZW5vLFxuICAgICAgICBjb2xfb2Zmc2V0OiBmaXJzdC5jb2xfb2Zmc2V0LFxuXG4gICAgICAgIGVuZF9saW5lbm8gICAgOiBsYXN0LmVuZF9saW5lbm8sXG4gICAgICAgIGVuZF9jb2xfb2Zmc2V0OiBsYXN0LmVuZF9jb2xfb2Zmc2V0XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKHZpcnRfbm9kZSwgXCJhcmdzXCIsIG51bGwsIG51bGwsIGFyZ3MpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfYXJnKG5vZGU6IGFueSwgY29udGV4dDogQ29udGV4dCkge1xuXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKG5vZGUsIFwiYXJnXCIsIG5vZGUuYW5ub3RhdGlvbi5pZCwgbm9kZS5hcmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9saW5lKGxpbmU6IGFueSwgY29udGV4dDogQ29udGV4dCk6IEFTVE5vZGUge1xuXG4gICAgbGV0IG5vZGUgPSBsaW5lO1xuXG4gICAgaWYoIGxpbmUuY29uc3RydWN0b3IuJG5hbWUgPT09IFwiRXhwclwiKVxuICAgICAgICBub2RlID0gbGluZS52YWx1ZTtcbiAgICAvKlxuICAgIGlmKCBcInZhbHVlXCIgaW4gbGluZSAmJiAhIChcInRhcmdldHNcIiBpbiBsaW5lKSAmJiAhIChcInRhcmdldFwiIGluIGxpbmUpIClcbiAgICAgICAgbm9kZSA9IGxpbmUudmFsdWU7Ki9cblxuICAgIHJldHVybiBjb252ZXJ0X25vZGUoIG5vZGUsIGNvbnRleHQgKTtcbn1cblxuZXhwb3J0IHR5cGUgQ29udGV4dCA9IHtcbiAgICBsb2NhbF92YXJpYWJsZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZ3xudWxsPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9hc3QoYXN0OiBhbnkpOiBBU1ROb2RlW10ge1xuXG4gICAgY29uc3QgY29udGV4dCA9IHtcbiAgICAgICAgbG9jYWxfdmFyaWFibGVzOiBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5KGFzdC5ib2R5Lmxlbmd0aCk7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFzdC5ib2R5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIC8vVE9ETzogZGV0ZWN0IGNvbW1lbnRzXG4gICAgICAgIHJlc3VsdFtpXSA9IGNvbnZlcnRfbGluZShhc3QuYm9keVtpXSwgY29udGV4dCk7XG4gICAgfVxuXG4gICAgLy9UT0RPOiBkZXRlY3QgY29tbWVudHMuLi5cblxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiZXhwb3J0IHR5cGUgQ29kZVBvcyA9IHtcbiAgICBsaW5lOiBudW1iZXIsXG4gICAgY29sIDogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIENvZGVSYW5nZSA9IHtcbiAgICBzdGFydDogQ29kZVBvcyxcbiAgICBlbmQgIDogQ29kZVBvc1xufVxuXG5leHBvcnQgY2xhc3MgQVNUTm9kZSB7XG5cblx0dHlwZSAgICA6IHN0cmluZztcblx0dmFsdWUgICA6IGFueTtcblx0Y2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdO1xuXHRyZXN1bHRfdHlwZTogc3RyaW5nfG51bGwgPSBudWxsO1xuXG4gICAgcHljb2RlOiBDb2RlUmFuZ2U7XG4gICAganNjb2RlPzogQ29kZVJhbmdlO1xuXG5cdHRvSlM/OiAodGhpczogQVNUTm9kZSwgY3Vyc29yOiBDb2RlUG9zKSA9PiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IoYnJ5dGhvbl9ub2RlOiBhbnksIHR5cGU6IHN0cmluZywgcmVzdWx0X3R5cGU6IHN0cmluZ3xudWxsLCBfdmFsdWU6IGFueSA9IG51bGwsIGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXSkge1xuXG5cdFx0dGhpcy50eXBlICAgPSB0eXBlO1xuXHRcdHRoaXMucmVzdWx0X3R5cGUgPSByZXN1bHRfdHlwZTtcblx0XHR0aGlzLnZhbHVlICA9IF92YWx1ZTtcblx0XHR0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4hO1xuXHRcdHRoaXMucHljb2RlID0ge1xuXHRcdFx0c3RhcnQ6IHtcblx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmxpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuY29sX29mZnNldFxuXHRcdFx0fSxcblx0XHRcdGVuZDoge1xuXHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUuZW5kX2xpbmVubyxcblx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuZW5kX2NvbF9vZmZzZXRcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7cHkyYXN0LCBjb252ZXJ0X2FzdH0gZnJvbSBcIi4vcHkyYXN0XCI7XG5leHBvcnQge2FzdDJqc30gZnJvbSBcIi4vYXN0MmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgX3JffSBmcm9tIFwiLi9jb3JlX3J1bnRpbWUvbGlzdHNcIjtcbmV4cG9ydCB7X2JffSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvbGlzdHNcIjsiXSwibmFtZXMiOlsiQVNUTm9kZSIsImFzdDJqcyIsImFzdCIsImpzIiwiY3Vyc29yIiwibGluZSIsImNvbCIsIm5vZGUiLCJhc3Rub2RlMmpzIiwibmV3bGluZSIsInIiLCJzdHIiLCJhcmdzIiwidG9KUyIsImxlbmd0aCIsImUiLCJzIiwiaSIsImJvZHkyanMiLCJpZHgiLCJzdGFydCIsImJvZHkiLCJjaGlsZHJlbiIsIm5lZWRzX29mZnNldCIsImluY2x1ZGVzIiwidHlwZSIsImpzY29kZSIsImVuZCIsImFyZ3MyanMiLCJhcmcyanMiLCJ2YWx1ZSIsImluZGVudF9sZXZlbCIsImluZGVudCIsInBhZFN0YXJ0IiwiX2N1cnNvciIsImNvbnZlcnQiLCJfY29udGV4dCIsImJlZyIsImluY3IiLCJjb252ZXJ0X2JvZHkiLCJjb252ZXJ0X25vZGUiLCJjb250ZXh0IiwidGFyZ2V0IiwiaWQiLCJsb2NhbF92YXJpYWJsZXMiLCJpdGVyIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImZ1bmMiLCJtYXAiLCJuIiwiYnJ5dGhvbl9uYW1lIiwia2V5d29yZCIsIm9mZnNldCIsImlmYmxvY2siLCJjb25kIiwidGVzdCIsInJlc3VsdF90eXBlIiwiRXJyb3IiLCJzYnJ5dGhvbl90eXBlIiwiY3VyIiwib3JlbHNlIiwicHVzaCIsImxpbmVubyIsImNvbF9vZmZzZXQiLCJlbmRfbGluZW5vIiwiZW5kX2NvbF9vZmZzZXQiLCJhc3Rub2RlIiwiY2MiLCJweWNvZGUiLCJ0cnlibG9jayIsImNvbnNvbGUiLCJsb2ciLCJjYXRjaGJsb2NrIiwiaGFuZGxlcnMiLCJzdGFydHNXaXRoIiwiY29udmVydF9hcmdzIiwiYXJnIiwibmFtZSIsImV4YyIsIlB5dGhvbkVycm9yIiwicHl0aG9uX2V4Y2VwdGlvbiIsIkFTVF9DT05WRVJUXzAiLCJBU1QySlNfMCIsIkFTVF9DT05WRVJUXzEiLCJBU1QySlNfMSIsIkFTVF9DT05WRVJUXzIiLCJBU1QySlNfMiIsIkFTVF9DT05WRVJUXzMiLCJBU1QySlNfMyIsIkFTVF9DT05WRVJUXzQiLCJBU1QySlNfNCIsIkFTVF9DT05WRVJUXzUiLCJBU1QySlNfNSIsIkFTVF9DT05WRVJUXzYiLCJBU1QySlNfNiIsIkFTVF9DT05WRVJUXzciLCJBU1QySlNfNyIsIkFTVF9DT05WRVJUXzgiLCJBU1QySlNfOCIsIkFTVF9DT05WRVJUXzkiLCJBU1QySlNfOSIsIkFTVF9DT05WRVJUXzEwIiwiQVNUMkpTXzEwIiwiQVNUX0NPTlZFUlRfMTEiLCJBU1QySlNfMTEiLCJSVU5USU1FXzExIiwiQVNUX0NPTlZFUlRfMTIiLCJBU1QySlNfMTIiLCJBU1RfQ09OVkVSVF8xMyIsIkFTVDJKU18xMyIsIkFTVF9DT05WRVJUXzE0IiwiQVNUMkpTXzE0IiwiQVNUX0NPTlZFUlRfMTUiLCJBU1QySlNfMTUiLCJBU1RfQ09OVkVSVF8xNiIsIkFTVDJKU18xNiIsIkFTVF9DT05WRVJUXzE3IiwiQVNUMkpTXzE3IiwiQVNUX0NPTlZFUlRfMTgiLCJBU1QySlNfMTgiLCJNT0RVTEVTIiwiQVNUX0NPTlZFUlQiLCJBU1QySlMiLCJSVU5USU1FIiwiT2JqZWN0IiwiYXNzaWduIiwiX2JfIiwiX19jbGFzc19fIiwiX19xdWFsbmFtZV9fIiwib3AiLCJsZWZ0IiwicmlnaHQiLCJlbmRzV2l0aCIsInRhcmdldHMiLCJyaWdodF90eXBlIiwiYW5ub3RhdGlvbiIsImNvbXBhcmF0b3JzIiwidW5kZWZpbmVkIiwiZXhwciIsIl9yXyIsImlzQ2xhc3MiLCJfIiwiUHlfb2JqZWN0IiwiUHlfRXhjZXB0aW9uIiwiUlVOVElNRV8wIiwiUlVOVElNRV8xIiwiQ09SRV9NT0RVTEVTIiwibW9kdWxlcyIsIm1vZHVsZV9uYW1lIiwibW9kdWxlIiwibmFtZXMiLCJBcnJheSIsImlzQXJyYXkiLCJweTJhc3QiLCJjb2RlIiwicGFyc2VyIiwiJEIiLCJQYXJzZXIiLCJfYXN0IiwiX1B5UGVnZW4iLCJydW5fcGFyc2VyIiwiY29udmVydF9hc3QiLCJicnl0aG9uX25vZGUiLCJ3YXJuIiwicmVzdWx0IiwiZXJyb3IiLCJsaW5lcyIsIm0iLCJjb252ZXJ0X2xpbmUiLCJsYXN0IiwidmlydF9ub2RlIiwiY29udmVydF9hcmciLCJmaXJzdCIsImNyZWF0ZSIsIl92YWx1ZSIsImRlZmF1bHQiXSwic291cmNlUm9vdCI6IiJ9