import { body2js, newline, r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    let js = toJS("catch(_raw_err_){", cursor);
    js+= newline(this, cursor, 1);
    js+= toJS("const _err_ = _raw_err_ instanceof _b_.PythonError", cursor);
    js+= newline(this, cursor, 4);
    js+= toJS("? _raw_err_.python_exception", cursor);
    js+= newline(this, cursor, 4);
    js+= toJS(": new _r_.JSException(_raw_err_);", cursor);
        // debug
        js+= newline(this, cursor, 1);
        js += toJS("_b_.debug_print_exception(_err_, __SBRYTHON__)", cursor);
    js+= newline(this, cursor, 1);

    js+= newline(this, cursor, 1);

    for(let handler of this.children)
        js+= toJS(handler, cursor);
    
    if( this.children[ this.children.length - 1].children.length !== 1 )
        js+= toJS("else{ throw _raw_err_ }", cursor); //TODO...

    js+= newline(this, cursor, 0);
    js+= toJS("}", cursor);
    return js;
}