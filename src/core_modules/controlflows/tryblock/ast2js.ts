import { body2js, newline, r, toJS } from "ast2js";
import { ASTNode, CodePos } from "structs/ASTNode";

export default function ast2js(this: ASTNode, cursor: CodePos) {

    if( this.type === "controlflows.tryblock") {
        let js = "";
        for(let i = 0; i < this.children.length; ++i)
            js += toJS(this.children[i], cursor);
        return js;
    }

    if( this.type === "controlflows.try") {
        let js = toJS("try", cursor);
            js+= body2js(this, cursor);
        return js;
    }

    if( this.type === "controlflows.catchblock") {
        let js = toJS("catch(_raw_err_){", cursor);
        js+= newline(this, cursor, 1);
        js+= toJS("const _err_ = _raw_err_ instanceof _b_.PythonError", cursor);
        js+= newline(this, cursor, 4);
        js+= toJS("? _raw_err_.python_exception;", cursor);
        js+= newline(this, cursor, 4);
        js+= toJS(": new _r_.JSException(_raw_err_);", cursor);
        js+= newline(this, cursor, 1);
        js+= newline(this, cursor, 1);
        js+= toJS("if(true){", cursor); //TODO...

            js += toJS("console.warn('exp', _err_);", cursor); // debug
            //TODO catch...
            js+= newline(this, cursor, 1);
            js += body2js(this, cursor, 0); //TODO
            //TODO only if no general catch...
        js+= newline(this, cursor, 1);
        js+= toJS("} else { throw _raw_err_ }", cursor);

        --this.jscode!.start.col; // h4ck
        js+= newline(this, cursor, 0); // make new lines handle it ?
        --this.jscode!.start.col; // h4ck
        js+= toJS("}", cursor);
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

    return js;*/
}