import { AST_BODY, AST_LIT_BOOL } from "./ast2js";
import dop_reset, { addChild, ASTNODES, createASTNode, setType, VALUES } from "./dop"
import { AST, Context } from "./py2ast"

const END_OF_SYMBOL = /[^\w]/;

let offset = 0;
let code: string;

function nextSymbol(){
    const end = code.slice(offset).search(END_OF_SYMBOL);
    return code.slice(offset, offset += end );
}

const KNOWN_SYMBOLS: Record<string, (id: number)=>void> = {
    "True" : (id) => {
        setType(id, AST_LIT_BOOL);
        VALUES[id] = true; //TODO...
    },
    "False": (id) => {
        setType(id, AST_LIT_BOOL);
        VALUES[id] = false; //TODO...
    }
}

export function py2ast(_code: string, filename: string): AST {
    
    if( _code[_code.length-1] !== '\n')
        _code += '\n'; // avoid EOF issue when parsing...

    code = _code;

    const nodes = ASTNODES;
    dop_reset();
    offset = 0;
    
    const id = createASTNode();

    setType(id, AST_BODY);
    const coffset = addChild(id, 1); // we don't know the number of child in advance...

    const symbol = KNOWN_SYMBOLS[nextSymbol()];
    if( symbol !== undefined)
        symbol(coffset); //TODO: add node...

    //TODO indent...

    return {
        nodes, //TODO: slice
        filename
    }
}