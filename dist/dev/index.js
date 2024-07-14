/******/ var __webpack_modules__ = ({

/***/ "./src/ast2js.ts":
/*!***********************!*\
  !*** ./src/ast2js.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ast2js: () => (/* binding */ ast2js),
/* harmony export */   astnode2js: () => (/* binding */ astnode2js)
/* harmony export */ });
function ast2js(ast) {
    let js = "";
    let cursor = {
        line: 1,
        col: 0
    };
    for (let node of ast){
        js += astnode2js(node, cursor) + "\n";
        ++cursor.line;
    }
    return js;
}
function astnode2js(node, start) {
    node.jscode = {
        start: {
            ...start
        },
        end: null
    };
    let js = node.toJS();
    /*else if(node.type === "float")
        js = node.value;
    else if(node.type === "if") //TODO...
        js = `if( ${convert_astnode2js(node.children[0])} ) {
    ${node.children.slice(1).map( e => convert_astnode2js(e)).join("\n")}    
    }`;
    else
        js = "";*/ node.jscode.end = {
        line: start.line,
        col: start.col + js.length
    };
    return js;
}


/***/ }),

/***/ "./src/core_modules/integer/ast2js.ts":
/*!********************************************!*\
  !*** ./src/core_modules/integer/ast2js.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
function ast2js() {
    return `${this.value}n`;
}


/***/ }),

/***/ "./src/core_modules/integer/astconvert.ts":
/*!************************************************!*\
  !*** ./src/core_modules/integer/astconvert.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");

function convert(node) {
    if (typeof node.value !== "number") return false;
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(node, "integer", node.value);
}


/***/ }),

/***/ "./src/core_modules/operators/ast2js.ts":
/*!**********************************************!*\
  !*** ./src/core_modules/operators/ast2js.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ast2js)
/* harmony export */ });
/* harmony import */ var ast2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ast2js */ "./src/ast2js.ts");

function ast2js() {
    let cursor = {
        ...this.jscode.start
    };
    const start_col = cursor.col;
    let js = "op(";
    cursor.col = start_col + js.length;
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[0], cursor);
    js += ", '+', ";
    cursor.col = start_col + js.length;
    js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[1], cursor);
    js += ")";
    /*let js = `${this.value}(`;
    for(let i = 0; i < this.children.length; ++i) {
        if( i !== 0)
            js += ",";
        cursor.col = start_col + js.length;
        js += astnode2js(this.children[i], cursor);
    }
    js += ")";*/ return js;
}


/***/ }),

/***/ "./src/core_modules/operators/astconvert.ts":
/*!**************************************************!*\
  !*** ./src/core_modules/operators/astconvert.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! py2ast */ "./src/py2ast.ts");
/* harmony import */ var structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! structs/ASTNode */ "./src/structs/ASTNode.ts");


function convert(node) {
    if (!("op" in node)) return false;
    let op = node.op.constructor.$name;
    if (op === "Add") op = "+";
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "Operator", op, [
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.left),
        (0,py2ast__WEBPACK_IMPORTED_MODULE_0__.convert_node)(node.right)
    ]);
}


/***/ }),

/***/ "./src/py2ast.ts":
/*!***********************!*\
  !*** ./src/py2ast.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convert_node: () => (/* binding */ convert_node),
/* harmony export */   py2ast: () => (/* binding */ py2ast)
/* harmony export */ });
/* harmony import */ var _structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./structs/ASTNode */ "./src/structs/ASTNode.ts");
/* harmony import */ var _core_modules_operators_astconvert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core_modules/operators/astconvert */ "./src/core_modules/operators/astconvert.ts");
/* harmony import */ var _core_modules_integer_astconvert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core_modules/integer/astconvert */ "./src/core_modules/integer/astconvert.ts");
/* harmony import */ var _core_modules_operators_ast2js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core_modules/operators/ast2js */ "./src/core_modules/operators/ast2js.ts");
/* harmony import */ var _core_modules_integer_ast2js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core_modules/integer/ast2js */ "./src/core_modules/integer/ast2js.ts");
// Brython must be imported before.

//TODO: use genlist


const AST_CONVERT = [
    _core_modules_operators_astconvert__WEBPACK_IMPORTED_MODULE_1__["default"],
    _core_modules_integer_astconvert__WEBPACK_IMPORTED_MODULE_2__["default"]
];
//TODO: use genlist


const AST2JS = [
    _core_modules_operators_ast2js__WEBPACK_IMPORTED_MODULE_3__["default"],
    _core_modules_integer_ast2js__WEBPACK_IMPORTED_MODULE_4__["default"]
];
function py2ast(code) {
    const parser = new $B.Parser(code, "filename", 'file');
    const _ast = $B._PyPegen.run_parser(parser);
    console.log("AST", _ast);
    return convert_ast(_ast);
}
function convert_node(brython_node) {
    for(let i = 0; i < AST_CONVERT.length; ++i){
        let result = AST_CONVERT[i](brython_node);
        if (result !== false) {
            result.toJS = AST2JS[i];
            return result;
        }
    }
    return new _structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(brython_node);
}
function convert_ast(ast) {
    return ast.body.map((line)=>{
        return convert_node(line.value);
    });
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
    pycode;
    jscode;
    toJS;
    constructor(brython_node, type, _value, children = []){
        if (type !== undefined) {
            this.type = type;
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
            return;
        }
        let line = brython_node;
        this.pycode = {
            start: {
                line: line.lineno ?? line.value.lineno,
                col: line.col_offset ?? line.value.col_offset
            },
            end: {
                line: line.end_lineno ?? line.value.end_lineno,
                col: line.end_col_offset ?? line.value.end_col_offset
            }
        };
        //TODO move...
        if ("test" in line) {
            this.type = "if";
            this.value = "";
            this.children = [
                new ASTNode({
                    value: line.test
                }),
                ...line.body.map((m)=>new ASTNode(m))
            ];
            return;
        }
        const value = line.value;
        if (value === undefined) {
            this.type = "pass";
            this.value = "";
            return;
        }
        if ("comparators" in value) {
            this.type = "Operator";
            this.value = "Equals";
            this.children = [
                new ASTNode({
                    value: value.left
                }),
                new ASTNode({
                    value: value.comparators[0]
                })
            ];
            return;
        }
        this.type = typeof value.value;
        this.value = value.value;
        if (this.type === "number") this.type = "integer";
        if (value.value instanceof Object && "value" in value.value) {
            this.type = "float";
            this.value = value.value.value;
        }
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
/* harmony export */   ast2js: () => (/* reexport safe */ _ast2js__WEBPACK_IMPORTED_MODULE_1__.ast2js),
/* harmony export */   py2ast: () => (/* reexport safe */ _py2ast__WEBPACK_IMPORTED_MODULE_0__.py2ast)
/* harmony export */ });
/* harmony import */ var _py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./py2ast */ "./src/py2ast.ts");
/* harmony import */ var _ast2js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ast2js */ "./src/ast2js.ts");



var __webpack_exports__ast2js = __webpack_exports__.ast2js;
var __webpack_exports__py2ast = __webpack_exports__.py2ast;
export { __webpack_exports__ast2js as ast2js, __webpack_exports__py2ast as py2ast };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aUMsSUFBSSxLQUFLLFVBQ2pCLElBQUksQ0FBQ0EsSUFBSSxHQUFHO1FBRWIsSUFBSWpDLE1BQU1BLEtBQUssWUFBWTRDLFVBQVUsV0FBVzVDLE1BQU1BLEtBQUssRUFBRTtZQUM1RCxJQUFJLENBQUNpQyxJQUFJLEdBQUc7WUFDWixJQUFJLENBQUNqQyxLQUFLLEdBQUdBLE1BQU1BLEtBQUssQ0FBQ0EsS0FBSztRQUMvQjtJQUNEO0FBQ0Q7Ozs7Ozs7U0MvRkE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05nQztBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9pbnRlZ2VyL2FzdDJqcy50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9jb3JlX21vZHVsZXMvaW50ZWdlci9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXN0Y29udmVydC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9weTJhc3QudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvc3RydWN0cy9BU1ROb2RlLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVNUTm9kZSwgQ29kZVBvcyB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGFzdDJqcyhhc3Q6IEFTVE5vZGVbXSkge1xuXG5cdGxldCBqcyA9IFwiXCI7XG4gICAgbGV0IGN1cnNvciA9IHtsaW5lOiAxLCBjb2w6IDB9O1xuXHRmb3IobGV0IG5vZGUgb2YgYXN0KSB7XG5cdFx0anMgKz0gYXN0bm9kZTJqcyhub2RlLCBjdXJzb3IpICsgXCJcXG5cIlxuICAgICAgICArK2N1cnNvci5saW5lO1xuICAgIH1cblxuXHRyZXR1cm4ganM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGFzdG5vZGUyanMobm9kZTogQVNUTm9kZSwgc3RhcnQ6IENvZGVQb3MpIHtcblxuICAgIG5vZGUuanNjb2RlID0ge1xuICAgICAgICBzdGFydDogey4uLnN0YXJ0fSxcbiAgICAgICAgZW5kICA6IG51bGwgYXMgYW55XG4gICAgfVxuXG4gICAgbGV0IGpzID0gbm9kZS50b0pTISgpO1xuICAgIFxuICAgIC8qZWxzZSBpZihub2RlLnR5cGUgPT09IFwiZmxvYXRcIilcbiAgICAgICAganMgPSBub2RlLnZhbHVlO1xuICAgIGVsc2UgaWYobm9kZS50eXBlID09PSBcImlmXCIpIC8vVE9ETy4uLlxuICAgICAgICBqcyA9IGBpZiggJHtjb252ZXJ0X2FzdG5vZGUyanMobm9kZS5jaGlsZHJlblswXSl9ICkge1xuICAgICR7bm9kZS5jaGlsZHJlbi5zbGljZSgxKS5tYXAoIGUgPT4gY29udmVydF9hc3Rub2RlMmpzKGUpKS5qb2luKFwiXFxuXCIpfSAgICBcbiAgICB9YDtcbiAgICBlbHNlXG4gICAgICAgIGpzID0gXCJcIjsqL1xuICAgIFxuICAgIG5vZGUuanNjb2RlLmVuZCA9IHtcbiAgICAgICAgbGluZTogc3RhcnQubGluZSxcbiAgICAgICAgY29sIDogc3RhcnQuY29sICsganMubGVuZ3RoXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuICAgIHJldHVybiBgJHt0aGlzLnZhbHVlfW5gO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55KSB7XG5cbiAgICBpZiggdHlwZW9mIG5vZGUudmFsdWUgIT09IFwibnVtYmVyXCIgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJpbnRlZ2VyXCIsIG5vZGUudmFsdWUpO1xufSIsImltcG9ydCB7IGFzdG5vZGUyanMgfSBmcm9tIFwiYXN0MmpzXCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3QyanModGhpczogQVNUTm9kZSkge1xuXG4gICAgbGV0IGN1cnNvciA9IHsuLi50aGlzLmpzY29kZSEuc3RhcnR9O1xuICAgIGNvbnN0IHN0YXJ0X2NvbCA9IGN1cnNvci5jb2w7XG5cbiAgICBsZXQganMgPSBcIm9wKFwiO1xuXG4gICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICBqcyArPSBhc3Rub2RlMmpzKHRoaXMuY2hpbGRyZW5bMF0sIGN1cnNvcik7XG5cbiAgICBqcyArPSBcIiwgJysnLCBcIjtcblxuICAgIGN1cnNvci5jb2wgPSBzdGFydF9jb2wgKyBqcy5sZW5ndGg7XG4gICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuWzFdLCBjdXJzb3IpO1xuXG4gICAganMgKz0gXCIpXCI7XG5cbiAgICAvKmxldCBqcyA9IGAke3RoaXMudmFsdWV9KGA7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApXG4gICAgICAgICAgICBqcyArPSBcIixcIjtcbiAgICAgICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICAgICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cbiAgICBqcyArPSBcIilcIjsqL1xuXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IGNvbnZlcnRfbm9kZSB9IGZyb20gXCJweTJhc3RcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnQobm9kZTogYW55KSB7XG5cbiAgICBpZiggISAoXCJvcFwiIGluIG5vZGUpIClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgbGV0IG9wID0gbm9kZS5vcC5jb25zdHJ1Y3Rvci4kbmFtZTtcbiAgICBpZiggb3AgPT09IFwiQWRkXCIpXG4gICAgICAgIG9wID0gXCIrXCI7XG5cbiAgICByZXR1cm4gbmV3IEFTVE5vZGUobm9kZSwgXCJPcGVyYXRvclwiLCBvcCxcbiAgICAgICAgW1xuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUubGVmdCApLFxuICAgICAgICAgICAgY29udmVydF9ub2RlKG5vZGUucmlnaHQpLFxuICAgICAgICBdXG4gICAgKTtcbn0iLCIvLyBCcnl0aG9uIG11c3QgYmUgaW1wb3J0ZWQgYmVmb3JlLlxuZGVjbGFyZSB2YXIgJEI6IGFueTtcblxuaW1wb3J0IHtBU1ROb2RlfSBmcm9tIFwiLi9zdHJ1Y3RzL0FTVE5vZGVcIjtcblxuLy9UT0RPOiB1c2UgZ2VubGlzdFxuaW1wb3J0IEMxIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9vcGVyYXRvcnMvYXN0Y29udmVydFwiO1xuaW1wb3J0IEMyIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9pbnRlZ2VyL2FzdGNvbnZlcnRcIjtcblxuY29uc3QgQVNUX0NPTlZFUlQgPSBbXG4gICAgQzEsXG4gICAgQzJcbl1cbi8vVE9ETzogdXNlIGdlbmxpc3RcbmltcG9ydCBBMSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2FzdDJqc1wiO1xuaW1wb3J0IEEyIGZyb20gXCIuL2NvcmVfbW9kdWxlcy9pbnRlZ2VyL2FzdDJqc1wiO1xuXG5jb25zdCBBU1QySlMgPSBbXG4gICAgQTEsXG4gICAgQTJcbl1cblxuZXhwb3J0IGZ1bmN0aW9uIHB5MmFzdChjb2RlOiBzdHJpbmcpIHtcblxuICAgIGNvbnN0IHBhcnNlciA9IG5ldyAkQi5QYXJzZXIoY29kZSwgXCJmaWxlbmFtZVwiLCAnZmlsZScpO1xuXHRjb25zdCBfYXN0ID0gJEIuX1B5UGVnZW4ucnVuX3BhcnNlcihwYXJzZXIpO1xuICAgIGNvbnNvbGUubG9nKFwiQVNUXCIsIF9hc3QpO1xuXG5cdHJldHVybiBjb252ZXJ0X2FzdChfYXN0KTsgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfbm9kZShicnl0aG9uX25vZGU6IGFueSk6IEFTVE5vZGUge1xuXG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgQVNUX0NPTlZFUlQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IEFTVF9DT05WRVJUW2ldKGJyeXRob25fbm9kZSk7XG4gICAgICAgIGlmKHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJlc3VsdC50b0pTID0gQVNUMkpTW2ldO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gbmV3IEFTVE5vZGUoYnJ5dGhvbl9ub2RlKTtcbn1cblxuZnVuY3Rpb24gY29udmVydF9hc3QoYXN0OiBhbnkpOiBBU1ROb2RlW10ge1xuXG5cdHJldHVybiBhc3QuYm9keS5tYXAoIChsaW5lOmFueSkgPT4ge1xuXG4gICAgICAgIHJldHVybiBjb252ZXJ0X25vZGUoIGxpbmUudmFsdWUgKTtcblx0fSk7XG59IiwiZXhwb3J0IHR5cGUgQ29kZVBvcyA9IHtcbiAgICBsaW5lOiBudW1iZXIsXG4gICAgY29sIDogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIENvZGVSYW5nZSA9IHtcbiAgICBzdGFydDogQ29kZVBvcyxcbiAgICBlbmQgIDogQ29kZVBvc1xufVxuXG5leHBvcnQgY2xhc3MgQVNUTm9kZSB7XG5cblx0dHlwZSAgICA6IHN0cmluZztcblx0dmFsdWUgICA6IGFueTtcblx0Y2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdO1xuXG4gICAgcHljb2RlOiBDb2RlUmFuZ2U7XG4gICAganNjb2RlPzogQ29kZVJhbmdlO1xuXG5cdHRvSlM/OiAodGhpczogQVNUTm9kZSkgPT4gc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKGJyeXRob25fbm9kZTogYW55LCB0eXBlPzogc3RyaW5nLCBfdmFsdWU/OiBhbnksIGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXSkge1xuXG4gICAgICAgIGlmKHR5cGUgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICB0aGlzLnR5cGUgICA9IHR5cGU7XG4gICAgICAgICAgICB0aGlzLnZhbHVlICA9IF92YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbiE7XG5cdFx0XHR0aGlzLnB5Y29kZSA9IHtcblx0XHRcdFx0c3RhcnQ6IHtcblx0XHRcdFx0XHRsaW5lOiBicnl0aG9uX25vZGUubGluZW5vLFxuXHRcdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmNvbF9vZmZzZXRcblx0XHRcdFx0fSxcblx0XHRcdFx0ZW5kOiB7XG5cdFx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmVuZF9saW5lbm8sXG5cdFx0XHRcdFx0Y29sOiBicnl0aG9uX25vZGUuZW5kX2NvbF9vZmZzZXRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuXHRcdGxldCBsaW5lID0gYnJ5dGhvbl9ub2RlO1xuXG5cbiAgICAgICAgdGhpcy5weWNvZGUgPSB7XG4gICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgIGxpbmU6IGxpbmUubGluZW5vID8/IGxpbmUudmFsdWUubGluZW5vLCAvL1RPRE8gZml4XG4gICAgICAgICAgICAgICAgY29sOiBsaW5lLmNvbF9vZmZzZXQgPz8gbGluZS52YWx1ZS5jb2xfb2Zmc2V0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgbGluZTogbGluZS5lbmRfbGluZW5vID8/IGxpbmUudmFsdWUuZW5kX2xpbmVubyxcbiAgICAgICAgICAgICAgICBjb2w6IGxpbmUuZW5kX2NvbF9vZmZzZXQgPz8gbGluZS52YWx1ZS5lbmRfY29sX29mZnNldFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9UT0RPIG1vdmUuLi5cblx0XHRpZiggXCJ0ZXN0XCIgaW4gbGluZSkge1xuXG5cdFx0XHR0aGlzLnR5cGUgPSBcImlmXCJcblx0XHRcdHRoaXMudmFsdWUgPSBcIlwiO1xuXHRcdFx0dGhpcy5jaGlsZHJlbiA9IFtuZXcgQVNUTm9kZSh7dmFsdWU6bGluZS50ZXN0fSksIC4uLmxpbmUuYm9keS5tYXAoIChtOmFueSkgPT4gbmV3IEFTVE5vZGUobSkgKV07XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgdmFsdWUgPSBsaW5lLnZhbHVlO1xuXG5cdFx0aWYoIHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMudHlwZSA9IFwicGFzc1wiO1xuXHRcdFx0dGhpcy52YWx1ZSA9IFwiXCI7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYoIFwiY29tcGFyYXRvcnNcIiBpbiB2YWx1ZSkge1xuXG5cdFx0XHR0aGlzLnR5cGUgPSBcIk9wZXJhdG9yXCI7XG5cdFx0XHR0aGlzLnZhbHVlID0gXCJFcXVhbHNcIjtcblx0XHRcdHRoaXMuY2hpbGRyZW4gPSBbXG5cdFx0XHRcdG5ldyBBU1ROb2RlKHt2YWx1ZTogdmFsdWUubGVmdH0pLFxuXHRcdFx0XHRuZXcgQVNUTm9kZSh7dmFsdWU6IHZhbHVlLmNvbXBhcmF0b3JzWzBdfSlcblx0XHRcdF07XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLnR5cGUgPSB0eXBlb2YgdmFsdWUudmFsdWU7XG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlLnZhbHVlO1xuXHRcdGlmKCB0aGlzLnR5cGUgPT09IFwibnVtYmVyXCIpXG5cdFx0XHR0aGlzLnR5cGUgPSBcImludGVnZXJcIlxuXG5cdFx0aWYoIHZhbHVlLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0ICYmIFwidmFsdWVcIiBpbiB2YWx1ZS52YWx1ZSkge1xuXHRcdFx0dGhpcy50eXBlID0gXCJmbG9hdFwiO1xuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlLnZhbHVlLnZhbHVlO1xuXHRcdH1cblx0fVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IHtweTJhc3R9IGZyb20gXCIuL3B5MmFzdFwiO1xuZXhwb3J0IHthc3QyanN9IGZyb20gXCIuL2FzdDJqc1wiOyJdLCJuYW1lcyI6WyJhc3QyanMiLCJhc3QiLCJqcyIsImN1cnNvciIsImxpbmUiLCJjb2wiLCJub2RlIiwiYXN0bm9kZTJqcyIsInN0YXJ0IiwianNjb2RlIiwiZW5kIiwidG9KUyIsImxlbmd0aCIsInZhbHVlIiwiQVNUTm9kZSIsImNvbnZlcnQiLCJzdGFydF9jb2wiLCJjaGlsZHJlbiIsImNvbnZlcnRfbm9kZSIsIm9wIiwiY29uc3RydWN0b3IiLCIkbmFtZSIsImxlZnQiLCJyaWdodCIsIkMxIiwiQzIiLCJBU1RfQ09OVkVSVCIsIkExIiwiQTIiLCJBU1QySlMiLCJweTJhc3QiLCJjb2RlIiwicGFyc2VyIiwiJEIiLCJQYXJzZXIiLCJfYXN0IiwiX1B5UGVnZW4iLCJydW5fcGFyc2VyIiwiY29uc29sZSIsImxvZyIsImNvbnZlcnRfYXN0IiwiYnJ5dGhvbl9ub2RlIiwiaSIsInJlc3VsdCIsImJvZHkiLCJtYXAiLCJ0eXBlIiwicHljb2RlIiwiX3ZhbHVlIiwidW5kZWZpbmVkIiwibGluZW5vIiwiY29sX29mZnNldCIsImVuZF9saW5lbm8iLCJlbmRfY29sX29mZnNldCIsInRlc3QiLCJtIiwiY29tcGFyYXRvcnMiLCJPYmplY3QiXSwic291cmNlUm9vdCI6IiJ9