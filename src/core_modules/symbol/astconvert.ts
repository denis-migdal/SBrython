import _r_ from "../../core_runtime/lists";
import { Context } from "py2ast";
import { SYMBOL } from "core_modules/lists";
import { setResultType, setType, VALUES } from "dop";

function isClass(_: unknown) {
    // from https://stackoverflow.com/questions/526559/testing-if-something-is-a-class-in-javascript
    return Object.getOwnPropertyDescriptors(_)?.prototype?.writable === false;
}

export default function convert(dst: number, node: any, context: Context) {

    let result_type = 0;
    let value = node.id;

    if( value === 'self')
        value = 'this'; //TODO type of current context ! -> self in local_symbols ?
    else if( value in context.local_symbols)
        result_type = context.local_symbols[value];
    /*
        //TODO globalSymbols
    else if(value in _r_) {
        if( isClass(_r_[value as keyof typeof _r_]) )
            result_type = `class.${value}`;

        value = `_r_.${value}`;
    }
    */

    setType(dst, SYMBOL);
    setResultType(dst, result_type);
    
    VALUES[dst] = value;
}


convert.brython_name = "Name";