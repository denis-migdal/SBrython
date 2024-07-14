/******/ var __webpack_modules__ = ({

/***/ "./src/py2ast.ts":
/*!***********************!*\
  !*** ./src/py2ast.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   py2ast: () => (/* binding */ py2ast)
/* harmony export */ });
/* harmony import */ var _structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./structs/ASTNode */ "./src/structs/ASTNode.ts");
// Brython must be imported before.

function py2ast(code) {
    const parser = new $B.Parser(code, "filename", 'file');
    const _ast = $B._PyPegen.run_parser(parser);
    console.log("AST", _ast);
    return convert_ast(_ast);
}
function convert_ast(ast) {
    return ast.body.map((line)=>{
        return new _structs_ASTNode__WEBPACK_IMPORTED_MODULE_0__.ASTNode(line);
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
    constructor(line){
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
        if ("op" in value) {
            this.type = "Operator";
            this.value = value.op.constructor.$name;
            this.children = [
                new ASTNode({
                    value: value.left
                }),
                new ASTNode({
                    value: value.right
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
/* harmony export */   py2ast: () => (/* reexport safe */ _py2ast__WEBPACK_IMPORTED_MODULE_0__.py2ast)
/* harmony export */ });
/* harmony import */ var _py2ast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./py2ast */ "./src/py2ast.ts");
 // TODO: dirty, use webpack lib
 // https://stackoverflow.com/questions/50058680/use-webpack-to-output-es6
 //window.py2ast = py2ast;

var __webpack_exports__py2ast = __webpack_exports__.py2ast;
export { __webpack_exports__py2ast as py2ast };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUksR0FBRztZQUNaLElBQUksQ0FBQ0MsS0FBSyxHQUFHQSxNQUFNQSxLQUFLLENBQUNBLEtBQUs7UUFDL0I7SUFDRDtBQUNEOzs7Ozs7O1NDcEZBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmdDLENBRWhDLCtCQUErQjtDQUMvQix5RUFBeUU7Q0FDekUseUJBQXlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vLi9zcmMvcHkyYXN0LnRzIiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL3N0cnVjdHMvQVNUTm9kZS50cyIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2ltcGxlcmJyeXRob24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zaW1wbGVyYnJ5dGhvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NpbXBsZXJicnl0aG9uLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEJyeXRob24gbXVzdCBiZSBpbXBvcnRlZCBiZWZvcmUuXG5kZWNsYXJlIHZhciAkQjogYW55O1xuXG5pbXBvcnQge0FTVE5vZGV9IGZyb20gXCIuL3N0cnVjdHMvQVNUTm9kZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gcHkyYXN0KGNvZGU6IHN0cmluZykge1xuXG4gICAgY29uc3QgcGFyc2VyID0gbmV3ICRCLlBhcnNlcihjb2RlLCBcImZpbGVuYW1lXCIsICdmaWxlJyk7XG5cdGNvbnN0IF9hc3QgPSAkQi5fUHlQZWdlbi5ydW5fcGFyc2VyKHBhcnNlcik7XG4gICAgY29uc29sZS5sb2coXCJBU1RcIiwgX2FzdCk7XG5cblx0cmV0dXJuIGNvbnZlcnRfYXN0KF9hc3QpOyAgIFxufVxuXG5mdW5jdGlvbiBjb252ZXJ0X2FzdChhc3Q6IGFueSk6IEFTVE5vZGVbXSB7XG5cblx0cmV0dXJuIGFzdC5ib2R5Lm1hcCggKGxpbmU6YW55KSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBBU1ROb2RlKGxpbmUpO1xuXHR9KTtcbn0iLCJ0eXBlIENvZGVQb3MgPSB7XG4gICAgbGluZTogbnVtYmVyLFxuICAgIGNvbCA6IG51bWJlclxufVxuXG50eXBlIENvZGVSYW5nZSA9IHtcbiAgICBzdGFydDogQ29kZVBvcyxcbiAgICBlbmQgIDogQ29kZVBvc1xufVxuXG5leHBvcnQgY2xhc3MgQVNUTm9kZSB7XG5cblx0dHlwZSAgICA6IHN0cmluZztcblx0dmFsdWUgICA6IGFueTtcblx0Y2hpbGRyZW46IEFTVE5vZGVbXSA9IFtdO1xuXG4gICAgcHljb2RlOiBDb2RlUmFuZ2U7XG4gICAganNjb2RlPzogQ29kZVJhbmdlO1xuXG5cdGNvbnN0cnVjdG9yKGxpbmU6IGFueSkge1xuXG4gICAgICAgIHRoaXMucHljb2RlID0ge1xuICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICBsaW5lOiBsaW5lLmxpbmVubyA/PyBsaW5lLnZhbHVlLmxpbmVubywgLy9UT0RPIGZpeFxuICAgICAgICAgICAgICAgIGNvbDogbGluZS5jb2xfb2Zmc2V0ID8/IGxpbmUudmFsdWUuY29sX29mZnNldFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgIGxpbmU6IGxpbmUuZW5kX2xpbmVubyA/PyBsaW5lLnZhbHVlLmVuZF9saW5lbm8sXG4gICAgICAgICAgICAgICAgY29sOiBsaW5lLmVuZF9jb2xfb2Zmc2V0ID8/IGxpbmUudmFsdWUuZW5kX2NvbF9vZmZzZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vVE9ETyBtb3ZlLi4uXG5cdFx0aWYoIFwidGVzdFwiIGluIGxpbmUpIHtcblxuXHRcdFx0dGhpcy50eXBlID0gXCJpZlwiXG5cdFx0XHR0aGlzLnZhbHVlID0gXCJcIjtcblx0XHRcdHRoaXMuY2hpbGRyZW4gPSBbbmV3IEFTVE5vZGUoe3ZhbHVlOmxpbmUudGVzdH0pLCAuLi5saW5lLmJvZHkubWFwKCAobTphbnkpID0+IG5ldyBBU1ROb2RlKG0pICldO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHZhbHVlID0gbGluZS52YWx1ZTtcblxuXHRcdGlmKCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLnR5cGUgPSBcInBhc3NcIjtcblx0XHRcdHRoaXMudmFsdWUgPSBcIlwiO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmKCBcImNvbXBhcmF0b3JzXCIgaW4gdmFsdWUpIHtcblxuXHRcdFx0dGhpcy50eXBlID0gXCJPcGVyYXRvclwiO1xuXHRcdFx0dGhpcy52YWx1ZSA9IFwiRXF1YWxzXCI7XG5cdFx0XHR0aGlzLmNoaWxkcmVuID0gW1xuXHRcdFx0XHRuZXcgQVNUTm9kZSh7dmFsdWU6IHZhbHVlLmxlZnR9KSxcblx0XHRcdFx0bmV3IEFTVE5vZGUoe3ZhbHVlOiB2YWx1ZS5jb21wYXJhdG9yc1swXX0pXG5cdFx0XHRdO1xuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYoIFwib3BcIiBpbiB2YWx1ZSApIHtcblx0XHRcdHRoaXMudHlwZSA9IFwiT3BlcmF0b3JcIjtcblxuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlLm9wLmNvbnN0cnVjdG9yLiRuYW1lO1xuXG5cdFx0XHR0aGlzLmNoaWxkcmVuID0gW1xuXHRcdFx0XHRuZXcgQVNUTm9kZSh7dmFsdWU6IHZhbHVlLmxlZnR9KSxcblx0XHRcdFx0bmV3IEFTVE5vZGUoe3ZhbHVlOiB2YWx1ZS5yaWdodH0pLFxuXHRcdFx0XVxuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy50eXBlID0gdHlwZW9mIHZhbHVlLnZhbHVlO1xuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZS52YWx1ZTtcblx0XHRpZiggdGhpcy50eXBlID09PSBcIm51bWJlclwiKVxuXHRcdFx0dGhpcy50eXBlID0gXCJpbnRlZ2VyXCJcblxuXHRcdGlmKCB2YWx1ZS52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCAmJiBcInZhbHVlXCIgaW4gdmFsdWUudmFsdWUpIHtcblx0XHRcdHRoaXMudHlwZSA9IFwiZmxvYXRcIjtcblx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZS52YWx1ZS52YWx1ZTtcblx0XHR9XG5cdH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7cHkyYXN0fSBmcm9tIFwiLi9weTJhc3RcIjtcblxuLy8gVE9ETzogZGlydHksIHVzZSB3ZWJwYWNrIGxpYlxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTAwNTg2ODAvdXNlLXdlYnBhY2stdG8tb3V0cHV0LWVzNlxuLy93aW5kb3cucHkyYXN0ID0gcHkyYXN0OyJdLCJuYW1lcyI6WyJBU1ROb2RlIiwicHkyYXN0IiwiY29kZSIsInBhcnNlciIsIiRCIiwiUGFyc2VyIiwiX2FzdCIsIl9QeVBlZ2VuIiwicnVuX3BhcnNlciIsImNvbnNvbGUiLCJsb2ciLCJjb252ZXJ0X2FzdCIsImFzdCIsImJvZHkiLCJtYXAiLCJsaW5lIiwidHlwZSIsInZhbHVlIiwiY2hpbGRyZW4iLCJweWNvZGUiLCJqc2NvZGUiLCJjb25zdHJ1Y3RvciIsInN0YXJ0IiwibGluZW5vIiwiY29sIiwiY29sX29mZnNldCIsImVuZCIsImVuZF9saW5lbm8iLCJlbmRfY29sX29mZnNldCIsInRlc3QiLCJtIiwidW5kZWZpbmVkIiwibGVmdCIsImNvbXBhcmF0b3JzIiwib3AiLCIkbmFtZSIsInJpZ2h0IiwiT2JqZWN0Il0sInNvdXJjZVJvb3QiOiIifQ==