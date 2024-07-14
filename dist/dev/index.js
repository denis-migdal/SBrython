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
    let js = `${this.value}(`;
    for(let i = 0; i < this.children.length; ++i){
        if (i !== 0) js += ",";
        cursor.col = start_col + js.length;
        js += (0,ast2js__WEBPACK_IMPORTED_MODULE_0__.astnode2js)(this.children[i], cursor);
    }
    js += ")";
    return js;
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
    return new structs_ASTNode__WEBPACK_IMPORTED_MODULE_1__.ASTNode(node, "Operator", node.op.constructor.$name, [
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxDQUFDQSxJQUFJLEdBQUc7UUFFYixJQUFJakMsTUFBTUEsS0FBSyxZQUFZNEMsVUFBVSxXQUFXNUMsTUFBTUEsS0FBSyxFQUFFO1lBQzVELElBQUksQ0FBQ2lDLElBQUksR0FBRztZQUNaLElBQUksQ0FBQ2pDLEtBQUssR0FBR0EsTUFBTUEsS0FBSyxDQUFDQSxLQUFLO1FBQy9CO0lBQ0Q7QUFDRDs7Ozs7OztTQy9GQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTmdDO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL2ludGVnZXIvYXN0MmpzLnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2NvcmVfbW9kdWxlcy9pbnRlZ2VyL2FzdGNvbnZlcnQudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hc3QyanMudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hc3Rjb252ZXJ0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3B5MmFzdC50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9zdHJ1Y3RzL0FTVE5vZGUudHMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBU1ROb2RlLCBDb2RlUG9zIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXN0MmpzKGFzdDogQVNUTm9kZVtdKSB7XG5cblx0bGV0IGpzID0gXCJcIjtcbiAgICBsZXQgY3Vyc29yID0ge2xpbmU6IDEsIGNvbDogMH07XG5cdGZvcihsZXQgbm9kZSBvZiBhc3QpIHtcblx0XHRqcyArPSBhc3Rub2RlMmpzKG5vZGUsIGN1cnNvcikgKyBcIlxcblwiXG4gICAgICAgICsrY3Vyc29yLmxpbmU7XG4gICAgfVxuXG5cdHJldHVybiBqcztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gYXN0bm9kZTJqcyhub2RlOiBBU1ROb2RlLCBzdGFydDogQ29kZVBvcykge1xuXG4gICAgbm9kZS5qc2NvZGUgPSB7XG4gICAgICAgIHN0YXJ0OiB7Li4uc3RhcnR9LFxuICAgICAgICBlbmQgIDogbnVsbCBhcyBhbnlcbiAgICB9XG5cbiAgICBsZXQganMgPSBub2RlLnRvSlMhKCk7XG4gICAgXG4gICAgLyplbHNlIGlmKG5vZGUudHlwZSA9PT0gXCJmbG9hdFwiKVxuICAgICAgICBqcyA9IG5vZGUudmFsdWU7XG4gICAgZWxzZSBpZihub2RlLnR5cGUgPT09IFwiaWZcIikgLy9UT0RPLi4uXG4gICAgICAgIGpzID0gYGlmKCAke2NvbnZlcnRfYXN0bm9kZTJqcyhub2RlLmNoaWxkcmVuWzBdKX0gKSB7XG4gICAgJHtub2RlLmNoaWxkcmVuLnNsaWNlKDEpLm1hcCggZSA9PiBjb252ZXJ0X2FzdG5vZGUyanMoZSkpLmpvaW4oXCJcXG5cIil9ICAgIFxuICAgIH1gO1xuICAgIGVsc2VcbiAgICAgICAganMgPSBcIlwiOyovXG4gICAgXG4gICAgbm9kZS5qc2NvZGUuZW5kID0ge1xuICAgICAgICBsaW5lOiBzdGFydC5saW5lLFxuICAgICAgICBjb2wgOiBzdGFydC5jb2wgKyBqcy5sZW5ndGhcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGpzO1xufSIsImltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG4gICAgcmV0dXJuIGAke3RoaXMudmFsdWV9bmA7XG59IiwiaW1wb3J0IHsgQVNUTm9kZSB9IGZyb20gXCJzdHJ1Y3RzL0FTVE5vZGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydChub2RlOiBhbnkpIHtcblxuICAgIGlmKCB0eXBlb2Ygbm9kZS52YWx1ZSAhPT0gXCJudW1iZXJcIiApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcImludGVnZXJcIiwgbm9kZS52YWx1ZSk7XG59IiwiaW1wb3J0IHsgYXN0bm9kZTJqcyB9IGZyb20gXCJhc3QyanNcIjtcbmltcG9ydCB7IEFTVE5vZGUgfSBmcm9tIFwic3RydWN0cy9BU1ROb2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzdDJqcyh0aGlzOiBBU1ROb2RlKSB7XG5cbiAgICBsZXQgY3Vyc29yID0gey4uLnRoaXMuanNjb2RlIS5zdGFydH07XG4gICAgY29uc3Qgc3RhcnRfY29sID0gY3Vyc29yLmNvbDtcblxuICAgIGxldCBqcyA9IGAke3RoaXMudmFsdWV9KGA7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYoIGkgIT09IDApXG4gICAgICAgICAgICBqcyArPSBcIixcIjtcbiAgICAgICAgY3Vyc29yLmNvbCA9IHN0YXJ0X2NvbCArIGpzLmxlbmd0aDtcbiAgICAgICAganMgKz0gYXN0bm9kZTJqcyh0aGlzLmNoaWxkcmVuW2ldLCBjdXJzb3IpO1xuICAgIH1cbiAgICBqcyArPSBcIilcIjtcblxuICAgIHJldHVybiBqcztcbn0iLCJpbXBvcnQgeyBjb252ZXJ0X25vZGUgfSBmcm9tIFwicHkyYXN0XCI7XG5pbXBvcnQgeyBBU1ROb2RlIH0gZnJvbSBcInN0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IGFueSkge1xuXG4gICAgaWYoICEgKFwib3BcIiBpbiBub2RlKSApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiBuZXcgQVNUTm9kZShub2RlLCBcIk9wZXJhdG9yXCIsIG5vZGUub3AuY29uc3RydWN0b3IuJG5hbWUsXG4gICAgICAgIFtcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLmxlZnQgKSxcbiAgICAgICAgICAgIGNvbnZlcnRfbm9kZShub2RlLnJpZ2h0KSxcbiAgICAgICAgXVxuICAgICk7XG59IiwiLy8gQnJ5dGhvbiBtdXN0IGJlIGltcG9ydGVkIGJlZm9yZS5cbmRlY2xhcmUgdmFyICRCOiBhbnk7XG5cbmltcG9ydCB7QVNUTm9kZX0gZnJvbSBcIi4vc3RydWN0cy9BU1ROb2RlXCI7XG5cbi8vVE9ETzogdXNlIGdlbmxpc3RcbmltcG9ydCBDMSBmcm9tIFwiLi9jb3JlX21vZHVsZXMvb3BlcmF0b3JzL2FzdGNvbnZlcnRcIjtcbmltcG9ydCBDMiBmcm9tIFwiLi9jb3JlX21vZHVsZXMvaW50ZWdlci9hc3Rjb252ZXJ0XCI7XG5cbmNvbnN0IEFTVF9DT05WRVJUID0gW1xuICAgIEMxLFxuICAgIEMyXG5dXG4vL1RPRE86IHVzZSBnZW5saXN0XG5pbXBvcnQgQTEgZnJvbSBcIi4vY29yZV9tb2R1bGVzL29wZXJhdG9ycy9hc3QyanNcIjtcbmltcG9ydCBBMiBmcm9tIFwiLi9jb3JlX21vZHVsZXMvaW50ZWdlci9hc3QyanNcIjtcblxuY29uc3QgQVNUMkpTID0gW1xuICAgIEExLFxuICAgIEEyXG5dXG5cbmV4cG9ydCBmdW5jdGlvbiBweTJhc3QoY29kZTogc3RyaW5nKSB7XG5cbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgJEIuUGFyc2VyKGNvZGUsIFwiZmlsZW5hbWVcIiwgJ2ZpbGUnKTtcblx0Y29uc3QgX2FzdCA9ICRCLl9QeVBlZ2VuLnJ1bl9wYXJzZXIocGFyc2VyKTtcbiAgICBjb25zb2xlLmxvZyhcIkFTVFwiLCBfYXN0KTtcblxuXHRyZXR1cm4gY29udmVydF9hc3QoX2FzdCk7ICAgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X25vZGUoYnJ5dGhvbl9ub2RlOiBhbnkpOiBBU1ROb2RlIHtcblxuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IEFTVF9DT05WRVJULmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBBU1RfQ09OVkVSVFtpXShicnl0aG9uX25vZGUpO1xuICAgICAgICBpZihyZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXN1bHQudG9KUyA9IEFTVDJKU1tpXTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG5ldyBBU1ROb2RlKGJyeXRob25fbm9kZSk7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRfYXN0KGFzdDogYW55KTogQVNUTm9kZVtdIHtcblxuXHRyZXR1cm4gYXN0LmJvZHkubWFwKCAobGluZTphbnkpID0+IHtcblxuICAgICAgICByZXR1cm4gY29udmVydF9ub2RlKCBsaW5lLnZhbHVlICk7XG5cdH0pO1xufSIsImV4cG9ydCB0eXBlIENvZGVQb3MgPSB7XG4gICAgbGluZTogbnVtYmVyLFxuICAgIGNvbCA6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBDb2RlUmFuZ2UgPSB7XG4gICAgc3RhcnQ6IENvZGVQb3MsXG4gICAgZW5kICA6IENvZGVQb3Ncbn1cblxuZXhwb3J0IGNsYXNzIEFTVE5vZGUge1xuXG5cdHR5cGUgICAgOiBzdHJpbmc7XG5cdHZhbHVlICAgOiBhbnk7XG5cdGNoaWxkcmVuOiBBU1ROb2RlW10gPSBbXTtcblxuICAgIHB5Y29kZTogQ29kZVJhbmdlO1xuICAgIGpzY29kZT86IENvZGVSYW5nZTtcblxuXHR0b0pTPzogKHRoaXM6IEFTVE5vZGUpID0+IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihicnl0aG9uX25vZGU6IGFueSwgdHlwZT86IHN0cmluZywgX3ZhbHVlPzogYW55LCBjaGlsZHJlbjogQVNUTm9kZVtdID0gW10pIHtcblxuICAgICAgICBpZih0eXBlICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgdGhpcy50eXBlICAgPSB0eXBlO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSAgPSBfdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4hO1xuXHRcdFx0dGhpcy5weWNvZGUgPSB7XG5cdFx0XHRcdHN0YXJ0OiB7XG5cdFx0XHRcdFx0bGluZTogYnJ5dGhvbl9ub2RlLmxpbmVubyxcblx0XHRcdFx0XHRjb2w6IGJyeXRob25fbm9kZS5jb2xfb2Zmc2V0XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVuZDoge1xuXHRcdFx0XHRcdGxpbmU6IGJyeXRob25fbm9kZS5lbmRfbGluZW5vLFxuXHRcdFx0XHRcdGNvbDogYnJ5dGhvbl9ub2RlLmVuZF9jb2xfb2Zmc2V0XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cblx0XHRsZXQgbGluZSA9IGJyeXRob25fbm9kZTtcblxuXG4gICAgICAgIHRoaXMucHljb2RlID0ge1xuICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICBsaW5lOiBsaW5lLmxpbmVubyA/PyBsaW5lLnZhbHVlLmxpbmVubywgLy9UT0RPIGZpeFxuICAgICAgICAgICAgICAgIGNvbDogbGluZS5jb2xfb2Zmc2V0ID8/IGxpbmUudmFsdWUuY29sX29mZnNldFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgIGxpbmU6IGxpbmUuZW5kX2xpbmVubyA/PyBsaW5lLnZhbHVlLmVuZF9saW5lbm8sXG4gICAgICAgICAgICAgICAgY29sOiBsaW5lLmVuZF9jb2xfb2Zmc2V0ID8/IGxpbmUudmFsdWUuZW5kX2NvbF9vZmZzZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vVE9ETyBtb3ZlLi4uXG5cdFx0aWYoIFwidGVzdFwiIGluIGxpbmUpIHtcblxuXHRcdFx0dGhpcy50eXBlID0gXCJpZlwiXG5cdFx0XHR0aGlzLnZhbHVlID0gXCJcIjtcblx0XHRcdHRoaXMuY2hpbGRyZW4gPSBbbmV3IEFTVE5vZGUoe3ZhbHVlOmxpbmUudGVzdH0pLCAuLi5saW5lLmJvZHkubWFwKCAobTphbnkpID0+IG5ldyBBU1ROb2RlKG0pICldO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHZhbHVlID0gbGluZS52YWx1ZTtcblxuXHRcdGlmKCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLnR5cGUgPSBcInBhc3NcIjtcblx0XHRcdHRoaXMudmFsdWUgPSBcIlwiO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmKCBcImNvbXBhcmF0b3JzXCIgaW4gdmFsdWUpIHtcblxuXHRcdFx0dGhpcy50eXBlID0gXCJPcGVyYXRvclwiO1xuXHRcdFx0dGhpcy52YWx1ZSA9IFwiRXF1YWxzXCI7XG5cdFx0XHR0aGlzLmNoaWxkcmVuID0gW1xuXHRcdFx0XHRuZXcgQVNUTm9kZSh7dmFsdWU6IHZhbHVlLmxlZnR9KSxcblx0XHRcdFx0bmV3IEFTVE5vZGUoe3ZhbHVlOiB2YWx1ZS5jb21wYXJhdG9yc1swXX0pXG5cdFx0XHRdO1xuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy50eXBlID0gdHlwZW9mIHZhbHVlLnZhbHVlO1xuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZS52YWx1ZTtcblx0XHRpZiggdGhpcy50eXBlID09PSBcIm51bWJlclwiKVxuXHRcdFx0dGhpcy50eXBlID0gXCJpbnRlZ2VyXCJcblxuXHRcdGlmKCB2YWx1ZS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCAmJiBcInZhbHVlXCIgaW4gdmFsdWUudmFsdWUpIHtcblx0XHRcdHRoaXMudHlwZSA9IFwiZmxvYXRcIjtcblx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZS52YWx1ZS52YWx1ZTtcblx0XHR9XG5cdH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7cHkyYXN0fSBmcm9tIFwiLi9weTJhc3RcIjtcbmV4cG9ydCB7YXN0MmpzfSBmcm9tIFwiLi9hc3QyanNcIjsiXSwibmFtZXMiOlsiYXN0MmpzIiwiYXN0IiwianMiLCJjdXJzb3IiLCJsaW5lIiwiY29sIiwibm9kZSIsImFzdG5vZGUyanMiLCJzdGFydCIsImpzY29kZSIsImVuZCIsInRvSlMiLCJsZW5ndGgiLCJ2YWx1ZSIsIkFTVE5vZGUiLCJjb252ZXJ0Iiwic3RhcnRfY29sIiwiaSIsImNoaWxkcmVuIiwiY29udmVydF9ub2RlIiwib3AiLCJjb25zdHJ1Y3RvciIsIiRuYW1lIiwibGVmdCIsInJpZ2h0IiwiQzEiLCJDMiIsIkFTVF9DT05WRVJUIiwiQTEiLCJBMiIsIkFTVDJKUyIsInB5MmFzdCIsImNvZGUiLCJwYXJzZXIiLCIkQiIsIlBhcnNlciIsIl9hc3QiLCJfUHlQZWdlbiIsInJ1bl9wYXJzZXIiLCJjb25zb2xlIiwibG9nIiwiY29udmVydF9hc3QiLCJicnl0aG9uX25vZGUiLCJyZXN1bHQiLCJib2R5IiwibWFwIiwidHlwZSIsInB5Y29kZSIsIl92YWx1ZSIsInVuZGVmaW5lZCIsImxpbmVubyIsImNvbF9vZmZzZXQiLCJlbmRfbGluZW5vIiwiZW5kX2NvbF9vZmZzZXQiLCJ0ZXN0IiwibSIsImNvbXBhcmF0b3JzIiwiT2JqZWN0Il0sInNvdXJjZVJvb3QiOiIifQ==