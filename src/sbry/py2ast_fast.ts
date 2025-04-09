import Types from "@SBrython/sbry/types/list";
import { AST_BODY, AST_LIT_TRUE, AST_LIT_FALSE, AST_KEY_ASSERT, AST_CTRL_WHILE, AST_KEY_BREAK, AST_KEY_CONTINUE, AST_KEY_PASS, AST_CTRL_IFBLOCK, AST_FCT_DEF, AST_FCT_DEF_ARGS, AST_KEY_RETURN, AST_LIT_FLOAT, AST_LIT_NONE, AST_LIT_STR, AST_LIT_INT } from "./ast2js";
import dop_reset, { addFirstChild, addSibling, ARRAY_TYPE, ASTNODES, CODE_BEG_COL, CODE_BEG_LINE, CODE_END_COL, CODE_END_LINE, createASTNode, NODE_ID, PY_CODE, setFirstChild, setResultType, setSibling, setType, VALUES } from "./dop"
import { AST, printNode } from "./py2ast"
import { ARGS_INFO, Callable, RETURN_TYPE, WRITE_CALL } from "./types/utils/types";
import { default_call } from "./ast2js/fct/call";
import { TYPEID_float, TYPEID_int, TYPEID_jsint } from "./types";
import { opsymbol2opid } from "./structs/operators";
import { TYPEID_str } from "./types";

const END_OF_SYMBOL = /[^\w]/;
const CHAR_NL    = 10;
const CHAR_SPACE = 32;
const CHAR_QUOTE = 34;
const CHAR_DOT   = 46;
const CHAR_COLON = 58;
const CHAR_DIGIT_0 = 48;
const CHAR_DIGIT_9 = 57;

let offset = 0;
let code: string;
let curChar!: number;

function currentChar() {
    return code.charCodeAt(offset);
}

function consumeEmptyLines(): boolean {

    while( offset < code.length ) {

        curChar = code.charCodeAt(offset);

        //TODO: if # => consume...

        if(curChar !== CHAR_NL)
            return true;

        if(__DEBUG__) ++CURSOR[0];
        ++offset;
    }

    if(__DEBUG__) CURSOR[1] = offset;

    return false;
}

function nextSymbol(){
    const end = code.slice(offset).search(END_OF_SYMBOL);

    if(__DEBUG__ && code.charCodeAt(offset+end) === CHAR_NL) {
        ++CURSOR[0];
        CURSOR[1] = offset + end + 1;
    }

    return code.slice(offset, offset += end );
}

const KNOWN_SYMBOLS: Record<string, (parent: NODE_ID)=>boolean> = {
    // for op tests
    "1"    :    (id) => {
        setType(id, AST_LIT_FLOAT);
        setResultType(id, TYPEID_float);
        VALUES[id] = 1;

        return false;
    },
    "True" :    (id) => { setType(id, AST_LIT_TRUE)    ; return false; },
    "False":    (id) => { setType(id, AST_LIT_FALSE)   ; return false; },
    "None" :    (id) => { setType(id, AST_LIT_NONE)    ; return false; },
    "break":    (id) => { setType(id, AST_KEY_BREAK)   ; return true; },
    "continue": (id) => { setType(id, AST_KEY_CONTINUE); return true; },
    "pass":     (id) => { setType(id, AST_KEY_PASS)    ; return true; },
    "return":   (id) => { setType(id, AST_KEY_RETURN)  ; return true; },
    "assert": (id) => {
        setType(id, AST_KEY_ASSERT);
        ++offset; //TODO: consume white spaces at the start of readExpr (?)
        setFirstChild(id, readExpr() );
        ++offset; // this is a \n

        return true;
    },
    "while": (id) => {
        setType(id, AST_CTRL_WHILE);
        ++offset; //TODO: consume white spaces at the start of readExpr (?)
        const first = setFirstChild(id, readExpr());
        ++offset; // this is a :

        setSibling(first, readBody()  );

        return true;
    },
    "if": (id) => {
        setType(id, AST_CTRL_IFBLOCK);
        ++offset; //TODO: consume white spaces at the start of readExpr (?)
        const first = setFirstChild(id, readExpr());
        ++offset; // this is a :

        setSibling(first, readBody() );

        return true;
    },
    "def": (id) => {

        setType(id, AST_FCT_DEF);
        ++offset; //TODO: consume white spaces at the start of readExpr (?)

        //TODO: need STypeFct... (fuck)
        VALUES[id] = nextSymbol(); // name

        const args = addFirstChild(id);
        setType(args, AST_FCT_DEF_ARGS);

        /****/
        const SType_fct: Callable = {
            __name__: "function",
            __call__: {
                __name__: "__call__",
                [RETURN_TYPE]: () => {
                    //generate(dst, node, context); // should be the new context
                    return SType_fct.__call__[RETURN_TYPE]();
                },
                [WRITE_CALL]: default_call,
                [ARGS_INFO]: {
                    //TODO...
                    args_names     : [],//new Array(node.args.args.length+node.args.posonlyargs.length),
                    args_pos       : {},
                    idx_end_pos    : 0,
                    idx_vararg     : 0,
                    has_kw         : false,
                    generate: null as any,
                }
            }
        }
    
        const STypeID = Types.length;
        Types[STypeID] = SType_fct;

        setResultType(id, STypeID);

        VALUES[args] = SType_fct; //TODO ?
        /****/

        offset += 3; //TODO: read args + ()

        setSibling(args, readBody() );

        return true;
    }
}

let CURRENT_INDENTATION = 0;
function consumeIndentedLines() {

    let beg = offset;
    while( offset < code.length ) {

        curChar = code.charCodeAt(offset);

        while( curChar === CHAR_SPACE ) {
            ++offset;
            curChar = code.charCodeAt(offset);
        }

        if(curChar !== CHAR_NL) {
            CURRENT_INDENTATION = beg - offset;
            return;
        }

        if(__DEBUG__) ++CURSOR[0];
        ++offset;
        beg = offset;
    }

    --offset;
    CURRENT_INDENTATION = 0;
    if(__DEBUG__) CURSOR[1] = offset;
}

function readBody(){

    const id = createASTNode();

    if( __DEBUG__ ) set_py_code_beg(id);

    setType(id, AST_BODY);

    consumeIndentedLines();
    const indent = CURRENT_INDENTATION;

    // a child is guaranteed.
    let cur = setFirstChild(id, readExpr() );

    consumeIndentedLines();
    while(CURRENT_INDENTATION === indent) {
        cur = setSibling(cur, readExpr() );
        consumeIndentedLines();
    }

    if( __DEBUG__ ) set_py_code_end(id);

    return id;
}

function consumeSpaces() {

    curChar = code.charCodeAt(offset);
    while(curChar === CHAR_SPACE)
        curChar = code.charCodeAt(++offset);
}

function readExpr() {

    let left = createASTNode();
    let op_node = left;

    if( __DEBUG__ ) set_py_code_beg(left); //TODO : for op node too... (copy)

    if( curChar === CHAR_QUOTE ) {
        // consume str
        setType(left, AST_LIT_STR);
        setResultType(left, TYPEID_str);

        const beg = offset;
        do {
            curChar = code.charCodeAt(++offset);
        } while( curChar !== CHAR_QUOTE);

        ++offset;

        VALUES[left] = code.slice(beg, offset);
    } if(curChar >= CHAR_DIGIT_0 && curChar <= CHAR_DIGIT_9 ) {
        // consume number
        const beg = offset;
        do {
            curChar = code.charCodeAt(++offset);
        } while( curChar >= CHAR_DIGIT_0 && curChar <= CHAR_DIGIT_9 );

        let astnode_type = AST_LIT_INT;
        let result_type  = TYPEID_int;

        if( curChar === CHAR_DOT ) {

            astnode_type = AST_LIT_FLOAT;
            result_type  = TYPEID_float;
        
            do {
                curChar = code.charCodeAt(++offset);
            } while( curChar >= CHAR_DIGIT_0 && curChar <= CHAR_DIGIT_9 );
        } else if( offset - beg <= 9 ) { // opti
            result_type = TYPEID_jsint
        }


              setType(left, astnode_type);
        setResultType(left, result_type);
        
        VALUES[left] = code.slice(beg, offset);
    }else {
        const token  = nextSymbol();
        const symbol = KNOWN_SYMBOLS[token];
        if( symbol !== undefined) {
            // if return true can't be part of an expression (avoid issue in next cond)
            if( symbol(left) ) { //TODO: search in context ?
                if( __DEBUG__ ) set_py_code_end(op_node);
                return op_node;
            }
        }
    }

    consumeSpaces();

    while( curChar !== CHAR_NL && curChar !== CHAR_COLON ) {

        let op    = code[offset];
        ++offset;

        const type    = opsymbol2opid[op as keyof typeof opsymbol2opid];
        op_node = createASTNode();
        setType(op_node, type);

        setFirstChild(op_node, left);
        VALUES[op_node] = "__add__"; //TODO

        // multi = * / > <
        // TODO: text op (+ not in + is not)

        consumeSpaces();

        const right = addSibling(left);

        let rtoken = nextSymbol();
        const symbol = KNOWN_SYMBOLS[rtoken];
        if( symbol !== undefined)
            symbol(right); //TODO: search in context ?

        curChar = code.charCodeAt(offset);
    }
    
    // /!\ escaped line...

    if( __DEBUG__ ) set_py_code_end(op_node);

    return op_node;

    // we can have several expr (e.g. assert)
    //++offset; // we know it is '\n' or ':'
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
    
    if( consumeEmptyLines() ) {

        let cur = setFirstChild(id, readExpr() );

        while( consumeEmptyLines() )
            cur = setSibling(cur, readExpr() );
    }

    return {
        nodes, //TODO: slice
        filename
    }
}


// py code

const CURSOR = __DEBUG__ ? new ARRAY_TYPE(2) : null as unknown as InstanceType<typeof ARRAY_TYPE>;


export function set_py_code_beg(id: NODE_ID) {

    const off = 4*(id as number);
    PY_CODE[ off + CODE_BEG_LINE ] = CURSOR[0] + 1;
    PY_CODE[ off + CODE_BEG_COL  ] = offset - CURSOR[1];
}

export function set_py_code_end(id: NODE_ID) {

    const off = 4*(id as number);
    PY_CODE[ off + CODE_END_LINE ] = CURSOR[0] + 1;
    PY_CODE[ off + CODE_END_COL  ] = offset - CURSOR[1];
}