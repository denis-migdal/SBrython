import Types, { TYPEID_None, TYPEID_NotImplementedType } from "@SBrython/sbry/types/list";
import { AST_BODY, AST_LIT_TRUE, AST_LIT_FALSE, AST_KEY_ASSERT, AST_CTRL_WHILE, AST_KEY_BREAK, AST_KEY_CONTINUE, AST_KEY_PASS, AST_CTRL_IF, AST_DEF_FCT, AST_DEF_ARGS, AST_KEY_RETURN, AST_LIT_FLOAT, AST_LIT_NONE, AST_LIT_STR, AST_LIT_INT, AST_CTRL_ELSE, AST_CTRL_ELIF, AST_STRUCT_LIST, AST_CTRL_FOR, AST_DEF_ARG_POSONLY, AST_DEF_ARG_VARARGS, AST_DEF_ARG_KWONLY, AST_DEF_ARG_KWARGS, AST_CALL, AST_DEF_ARG_POS, AST_OP_OP, AST_OP_ASSIGN, AST_SYMBOL, AST_OP_ASSIGN_AUG } from "./ast2js/list";
import dop_reset, { addFirstChild, addSibling, ARRAY_TYPE, ASTNODES, CODE_BEG_COL, CODE_BEG_LINE, CODE_END_COL, CODE_END_LINE, createASTNode, firstChild, nextSibling, NODE_ID, NODE_TYPE, PY_CODE, resultType, setFirstChild, setResultType, setSibling, setType, type, TYPE_ID, VALUES } from "./dop"
import { AST } from "./py2ast"
import { Callable, Fct, RETURN_TYPE, WRITE_CALL } from "./types/utils/types";
import { default_call } from "./ast2js/call/";
import { TYPEID_str, TYPEID_float, TYPEID_int, TYPEID_jsint } from "./types/list";
import { OP_ASSIGN, OP_BIT_NOT, OP_ID, OP_UNR_MINUS, opid2iopmethod, opid2opmethod, opid2ropmethod, opsymbol2opid, pyop_priorities } from "./structs/operators";
import { AST_COMMENT } from "./ast2js/list";
import builtins, { addSymbol, getSymbol, resetSymbols } from "./types/builtins";
import { AST_OP_ASSIGN_INIT } from "./ast2js/list";
import TYPES from "./types/list";
import { AST_OP_NOT } from "./ast2js/list";
import { TYPEID_NoneType } from "./types/list";
import { printNode } from "@SBrython/utils/print/printNode";

const END_OF_SYMBOL = /[^\w]/;
const CHAR_NL    = 10;
const CHAR_SPACE = 32;
const CHAR_QUOTE = 34;
const CHAR_HASH  = 35;
const CHAR_SINGLE_QUOTE = 39;
const CHAR_PARENTHESIS_LEFT   = 40;
const CHAR_PARENTHESIS_RIGHT  = 41;
const CHAR_STAR  = 42;
const CHAR_PLUS  = 43;
const CHAR_COMMA = 44;
const CHAR_MINUS = 45;
const CHAR_DOT   = 46;
const CHAR_SLASH = 47;
const CHAR_COLON = 58;
const CHAR_DIGIT_0 = 48;
const CHAR_DIGIT_9 = 57;
const CHAR_EQ      = 61;
const CHAR_BRACKET_LEFT   = 91;
const CHAR_BRACKET_RIGHT  = 93;
const CHAR_a              = 97;
const CHAR_z              = 122;
const CHAR_TILDE          = 126;

let offset = 0;
let code: string;
let curChar!: number;

function consumeEmptyLines(): boolean {

    while( offset < code.length ) {

        curChar = code.charCodeAt(offset);

        //TODO: if # => consume...

        if(curChar !== CHAR_NL) {
            if(__DEBUG__) CURSOR[1] = offset;
            return true;
        }

        if(__DEBUG__) ++CURSOR[0];
        ++offset;
    }

    if(__DEBUG__) CURSOR[1] = offset;

    return false;
}

function nextSymbol(){
    const end = code.slice(offset).search(END_OF_SYMBOL);

    return code.slice(offset, offset += end );
}

let CURRENT_PARAM_TYPE!: NODE_TYPE;
let POSONLY_END       !: NODE_ID;

function nextArg(cur: NODE_ID): boolean {

    ++offset; // ( or ,
    consumeSpaces();

    if( curChar === CHAR_PARENTHESIS_RIGHT )
        return false;

    if( curChar === CHAR_SLASH) {

        POSONLY_END = cur;

        ++offset; // /
        consumeSpaces();

        // @ts-ignore
        if( curChar === CHAR_PARENTHESIS_RIGHT )
            return false;

        return nextArg(cur);
    }

    if( curChar === CHAR_STAR) {
        
        curChar = code.charCodeAt(++offset);

        if( curChar === CHAR_STAR) {
            ++offset;
            consumeSpaces();
            CURRENT_PARAM_TYPE = AST_DEF_ARG_KWARGS;
            return true;
        }

        consumeSpaces();

        if( curChar === CHAR_COMMA) {
            CURRENT_PARAM_TYPE = AST_DEF_ARG_KWONLY;
            return nextArg(cur);
        }

        CURRENT_PARAM_TYPE = AST_DEF_ARG_VARARGS
        return true;
    }

    if( CURRENT_PARAM_TYPE === AST_DEF_ARG_VARARGS)
        CURRENT_PARAM_TYPE = AST_DEF_ARG_KWONLY;

    return true;
}

function readArg(id: NODE_ID) {

    VALUES[id] = nextSymbol(); // name
    consumeSpaces();

    if( curChar === CHAR_EQ ) { // might be or not, but well...
        ++offset;
        consumeSpaces();
        setFirstChild(id, readExpr()); // default value...
        // no needs for consumeSpace due to readExpr...
    }
}

const KNOWN_SYMBOLS: Record<string, (parent: NODE_ID)=>void> = {
    // possibles in expr:
    "None" :    (id) => setType(id, AST_LIT_NONE),
    "True" :    (id) => setType(id, AST_LIT_TRUE),
    "False":    (id) => setType(id, AST_LIT_FALSE),
    "not"  :    (id) => {

        setType(id, AST_OP_NOT);
        consumeSpaces();
        setFirstChild(id, readToken());
    },
    // not possibles in expr:
    "break":    (id) => setType(id, AST_KEY_BREAK),
    "continue": (id) => setType(id, AST_KEY_CONTINUE),
    "pass":     (id) => setType(id, AST_KEY_PASS),
    "return":   (id) => {
        setType(id, AST_KEY_RETURN);
        consumeSpaces();
        if( curChar !== CHAR_NL)
            setFirstChild(id, readExpr() );
    },
    "assert":   (id) => {
        setType(id, AST_KEY_ASSERT);
        consumeSpaces();

        const cond = setFirstChild(id, readExpr() );
        if( curChar === CHAR_COMMA) {
            ++offset; // consume comma
            consumeSpaces();
            setSibling(cond, readExpr() );
        }
    },
    "for": (id) => {
        // TODO: for range

        setType(id, AST_CTRL_FOR);
        ++offset; //TODO: consume white spaces at the start of readExpr (?)
        VALUES[id] = nextSymbol(); // name
        consumeSpaces();
        offset += 2; // "in"
        consumeSpaces();
        const first = setFirstChild(id, readExpr()); // list
        ++offset; // this is a :

        setSibling(first, readBody()  );
    },
    "while": (id) => {
        setType(id, AST_CTRL_WHILE);
        ++offset; //TODO: consume white spaces at the start of readExpr (?)
        const first = setFirstChild(id, readExpr());
        ++offset; // this is a :

        setSibling(first, readBody()  );
    },
    "if": (id) => {
        setType(id, AST_CTRL_IF);
        ++offset; //TODO: consume white spaces at the start of readExpr (?)
        const first = setFirstChild(id, readExpr());
        ++offset; // this is a :

        setSibling(first, readBody() );
    },
    "elif": (id) => {
        setType(id, AST_CTRL_ELIF);
        ++offset; //TODO: consume white spaces at the start of readExpr (?)
        const first = setFirstChild(id, readExpr());
        ++offset; // this is a :

        setSibling(first, readBody() );
    },
    "else": (id) => {
        setType(id, AST_CTRL_ELSE);
        ++offset; // this is a :

        setFirstChild(id, readBody() );
    },
    //TODO: elif/else
    "def": (id) => {

        setType(id, AST_DEF_FCT);
        ++offset; //TODO: consume white spaces at the start of readExpr (?)

        const name = VALUES[id] = nextSymbol(); // name

        const args = addFirstChild(id);
        setType(args, AST_DEF_ARGS);

        //TODO: if same return + write_call, can be shared (i.e. same type/typeID)
        const SType_fct: Callable = {
            __qualname__: name,
            __name__    : name,
            __call__: {
                __name__: "__call__",
                [RETURN_TYPE]: () => {
                    return TYPEID_None; //TODO...
                },
                [WRITE_CALL]: default_call,
            }
        }
    
        const STypeID = Types.length as TYPE_ID;
        Types[STypeID] = SType_fct;
        addSymbol(name, STypeID);

        setResultType(id, STypeID);

        const cur_builtin_idx = builtins.length;

        CURRENT_PARAM_TYPE = AST_DEF_ARG_POS;
        POSONLY_END        = 0;

        let cur: NODE_ID = 0;

        if( nextArg(cur) ) {

            readArg( cur = addFirstChild(args) );
            setType(cur, CURRENT_PARAM_TYPE);

            while( nextArg(cur) ) {
                readArg( cur = addSibling(cur) );
                setType(cur, CURRENT_PARAM_TYPE);
            }

            if( POSONLY_END !== 0) {

                let cur = firstChild(args);
                while(cur !== POSONLY_END) {
                    setType(cur, AST_DEF_ARG_POSONLY);
                    cur = nextSibling(cur);
                }
                setType(cur, AST_DEF_ARG_POSONLY); // ?
            }
        }

        offset += 2; // ):

        curChar = code.charCodeAt(offset);

        setSibling(args, readBody() );

        //TODO: set RETURN TYPE

        builtins.length = cur_builtin_idx;
    }
}

let CURRENT_INDENTATION = 0;
function consumeIndentedLines() {

    curChar = code.charCodeAt(offset);
    if( curChar !== CHAR_NL ) // indentation already consumed
        return;

    let beg = ++offset;
    while( offset < code.length ) {

        while( (curChar = code.charCodeAt(offset)) === CHAR_SPACE )
            ++offset;

        // we have a non-empty line.
        if(curChar !== CHAR_NL) {
            if(__DEBUG__) CURSOR[1] = offset;
            CURRENT_INDENTATION = offset - beg;
            return;
        }

        // empty line, consume next line.
        if(__DEBUG__) ++CURSOR[0];
        beg = ++offset;
    }

    if(__DEBUG__) CURSOR[1] = offset;

    CURRENT_INDENTATION = 0;
}

function readComment() {

    const node = createASTNode();
    setType(node, AST_COMMENT);

    if( __DEBUG__ ) set_py_code_beg(node);

    const beg = offset + 1;
    
    do {
        curChar = code.charCodeAt(++offset);
    } while(curChar !== CHAR_NL);

    if( __DEBUG__ ) set_py_code_end(node);
    VALUES[node] = code.slice(beg, offset);

    return node;
}

function readLine() {

    if( curChar === CHAR_HASH)
        return readComment();

    // TODO: move Expr if/else/etc. here...
    // TODO: true/false: how to handle ?

    return readExpr();
}

function readBody(){

    const id = createASTNode();

    if( __DEBUG__ ) set_py_code_beg(id);

    setType(id, AST_BODY);

    consumeIndentedLines(); // guaranty...
    const indent = CURRENT_INDENTATION;

    // a child is guaranteed.
    let cur = setFirstChild(id, readLine() );

    consumeIndentedLines(); // + check at the same time ???
    while(CURRENT_INDENTATION === indent) {
        cur = setSibling(cur, readLine() );
        consumeIndentedLines();
    }

    offset -= CURRENT_INDENTATION + 1;

    if( __DEBUG__ ) set_py_code_end(id);

    return id;
}

function consumeSpaces() {

    curChar = code.charCodeAt(offset);
    while(curChar === CHAR_SPACE)
        curChar = code.charCodeAt(++offset);
}

function readToken(): NODE_ID {

    //TODO: known symbol 2 versions...
    if( curChar === CHAR_MINUS) { // 43/45/126

        const call = createASTNode();

        if( __DEBUG__ )
            set_py_code_beg(call);

        const op = OP_UNR_MINUS; //opsymbol2uopid[code[offset++] as keyof typeof opsymbol2uopid];
        ++offset;
        consumeSpaces();
        return createCallUopNode(call, op, readToken());
    }
    if( curChar === CHAR_TILDE) {

        const call = createASTNode();

        if( __DEBUG__ )
            set_py_code_beg(call);

        const op = OP_BIT_NOT; //opsymbol2uopid[code[offset++] as keyof typeof opsymbol2uopid];
        ++offset;
        consumeSpaces();
        return createCallUopNode(call, op, readToken());
    }
    /*
        "+": OP_UNR_PLUS,
    */

    // sub expr
    if( curChar === CHAR_PARENTHESIS_LEFT) {

        ++offset; // (
        consumeSpaces();
        const node = readExpr();
        ++offset; // )
        consumeSpaces();

        return node;
    }

    let node = createASTNode();

    if( __DEBUG__ ) set_py_code_beg(node);

    if( curChar === CHAR_QUOTE || curChar === CHAR_SINGLE_QUOTE) { // consume str

        const end = curChar;

        setType(node, AST_LIT_STR);
        setResultType(node, TYPEID_str);

        const beg = offset;
        do {
            curChar = code.charCodeAt(++offset);
        } while( curChar !== end);

        ++offset;

        VALUES[node] = code.slice(beg, offset);

    } else if(curChar >= CHAR_DIGIT_0 && curChar <= CHAR_DIGIT_9 ) { // consume number

        const beg = offset;

        const nextChar = code.charCodeAt(++offset);
       
        if( curChar === CHAR_DIGIT_0 && nextChar > CHAR_DIGIT_9) {

            setType(node, AST_LIT_INT);
    
            if( nextChar === 66 || nextChar === 98 ) { // b
    
                do {
                    curChar = code.charCodeAt(++offset);
                } while( curChar === CHAR_DIGIT_0 || curChar === 49 ); // 1
    
                let result_type  = TYPEID_int;
                if( offset - beg < 32 ) // opti
                    result_type = TYPEID_jsint
        
                setResultType(node, result_type);
                
            } else if( nextChar === 79 || nextChar === 111 ) { // o
    
                do {
                    curChar = code.charCodeAt(++offset);
                } while(   curChar >= CHAR_DIGIT_0 && curChar <= 55 ); // 0 to 7
    
                let result_type  = TYPEID_int;
                if( offset - beg <= 10 ) // opti
                    result_type = TYPEID_jsint
        
                setResultType(node, result_type);
    
            } else if( nextChar === 88 || nextChar === 120 ) { // x
    
                do {
                    curChar = code.charCodeAt(++offset);
                } while(   curChar >= CHAR_DIGIT_0 && curChar <= CHAR_DIGIT_9
                        || curChar >= CHAR_a       && curChar <= 102
                        || curChar >= 65           && curChar <= 70
                 );
    
                let result_type  = TYPEID_int;
                if( offset - beg <= 8 ) // opti
                    result_type = TYPEID_jsint
        
                setResultType(node, result_type);
            }
        } else {

            curChar = nextChar;
            while( curChar >= CHAR_DIGIT_0 && curChar <= CHAR_DIGIT_9 ) {
                curChar = code.charCodeAt(++offset);
            }

            let astnode_type = AST_LIT_INT;
            let result_type  = TYPEID_int;

            if( curChar === CHAR_DOT ) {

                astnode_type = AST_LIT_FLOAT;
                result_type  = TYPEID_float;
            
                do {
                    curChar = code.charCodeAt(++offset);
                } while( curChar >= CHAR_DIGIT_0 && curChar <= CHAR_DIGIT_9 );
            }
            
            if( curChar === 69 || curChar === 101 ) { // e

                astnode_type = AST_LIT_FLOAT;
                result_type  = TYPEID_float;

                ++offset;
                do {
                    curChar = code.charCodeAt(++offset);
                } while( curChar >= CHAR_DIGIT_0 && curChar <= CHAR_DIGIT_9 );
            }
            
            if( result_type === AST_LIT_INT && offset - beg <= 9 ) // opti
                result_type = TYPEID_jsint

                setType(node, astnode_type);
            setResultType(node, result_type);
        }
        
        VALUES[node] = code.slice(beg, offset);

    }  else if( curChar === CHAR_BRACKET_LEFT ) {
        // consume list

        setType(node, AST_STRUCT_LIST);

        ++offset;

        consumeSpaces();
        // @ts-ignore
        if(curChar !== CHAR_BRACKET_RIGHT) {

            let cur = setFirstChild(node, readExpr() );

            consumeSpaces();
            // @ts-ignore
            if( curChar === CHAR_COMMA ) {
                ++offset;
                consumeSpaces();
            }

            // @ts-ignore
            while(curChar !== CHAR_BRACKET_RIGHT) {

                cur = setSibling(cur, readExpr() );

                consumeSpaces();
                // @ts-ignore
                if( curChar === CHAR_COMMA ) {
                    ++offset;
                    consumeSpaces();
                }
            }
        }

        ++offset;

    } else {
        //TODO: not
        const token  = nextSymbol();
        const symbol = KNOWN_SYMBOLS[token];
        if( symbol !== undefined)
            symbol(node);
        else {

            //TODO: search in local -> True/False/None in context ?

            if( __DEBUG__ ) set_py_code_end(node);

            setType(node, AST_SYMBOL);
            setResultType(node, getSymbol(token) );

            VALUES[node] = token;

            consumeSpaces(); // end of py code not exact... (set again later...)

            if( curChar === CHAR_PARENTHESIS_LEFT ) { // CALL

                let cur = node;

                node = createASTNode();
                setType(node, AST_CALL);
                setFirstChild(node, cur);

                const fctType = VALUES[node] = Types[resultType(cur)];
                //TODO: return type...

                if( __DEBUG__ ) set_py_code_beg(node);

                ++offset; // (
                consumeSpaces();

                let next: NODE_ID;

                // @ts-ignore
                while(curChar !== CHAR_PARENTHESIS_RIGHT) {

                    next = readExpr();

                    if(    type(next) === AST_OP_ASSIGN_INIT
                        || type(next) === AST_OP_ASSIGN ) {

                        //TODO: AST_CALL_ARG_KW
                        //TODO

                    }

                    cur = setSibling(cur, next);
                    // @ts-ignore
                    if( curChar === CHAR_COMMA) {
                        ++offset; // ,
                        consumeSpaces();
                    }
                    // TODO kw arg...
                    // TODO **kwargs + *varargs
                }

                // TODO: give call node...
                // @ts-ignore
                setResultType(node, fctType.__call__[RETURN_TYPE]() );

                ++offset; // )
            }
        }
    }

    if( __DEBUG__ ) set_py_code_end(node);

    consumeSpaces();
    return node;
}

function isEndOfExpr() {

    return curChar === CHAR_NL
        || curChar === CHAR_COLON
        || curChar === CHAR_COMMA
        || curChar === CHAR_BRACKET_RIGHT
        || curChar === CHAR_PARENTHESIS_RIGHT
}

function readOp() {

    const beg      = offset;
    if( curChar >= CHAR_a && curChar <= CHAR_z) { // and, not, in, etc.

        do {
            curChar = code.charCodeAt(++offset);
        } while( curChar >= CHAR_a && curChar <= CHAR_z );

    } else {
        let   nextChar = code.charCodeAt(offset+1);
        if( nextChar === curChar ) { // **, //, >>, <<, etc.
            ++offset;
            nextChar = code.charCodeAt(offset+1);
        }
        if( nextChar === CHAR_EQ ) // *=, **=, etc.
            ++offset;

        ++offset;
    }

    const op_str = code.slice(beg, offset);
    consumeSpaces();

    return opsymbol2opid[op_str as keyof typeof opsymbol2opid];
}

function readExpr() {

    let value = readToken();

    if( isEndOfExpr() )
        return value;

    let op      = readOp();
    const right = readToken();

    if( isEndOfExpr() )
        return createCallOpNode(createASTNode(), value, op, right);

    type OP_INFO = [NODE_ID, NODE_ID, number, NODE_ID];

    let lop : OP_INFO = [createASTNode(), value, op, 0];
    let rop : OP_INFO;

    let lop_prio = pyop_priorities[op];
    let rop_prio;

    value = right;

    const stack: OP_INFO[] = [
        lop
    ];

    do {
        
        op = readOp();
        rop_prio = pyop_priorities[op];

        // TODO...

        // priority
        if( lop_prio < rop_prio || lop_prio + rop_prio === 0) { // a+(b+...)

            rop    = [createASTNode(), value, op, 0]; // ?
            lop[3] = rop[0];

            stack.push(rop);

        } else { // (a+b)+...

            lop[3] = value;

            createCallOpNode(...lop);
            for(let i = stack.length - 1; i >= 0 ; --i)
                createCallOpNode(...stack[i]);

            stack.length = 1;

            rop      = [createASTNode(), stack[0][0], op, 0];
            stack[0] = rop;
        }

        lop      = rop;
        lop_prio = rop_prio;
        value = readToken();

    } while( ! isEndOfExpr() );

    lop[3] = value;
    createCallOpNode(...lop);

    for(let i = stack.length - 1; i >= 0 ; --i)
        createCallOpNode(...stack[i]);

    return stack[0][0];
}

let nbTypes: number;

export function py2ast(_code: string, filename: string): AST {

    // h4ck
    // @ts-ignore
    if( nbTypes === undefined)
        nbTypes = TYPES.length;

    TYPES.length = nbTypes;

    resetSymbols();
    
    if( _code[_code.length-1] !== '\n')
        _code += '\n'; // avoid EOF issue when parsing...

    code = _code;

    const nodes = ASTNODES;
    dop_reset();
    offset = 0;

    if( __DEBUG__ ) {
        CURSOR[0] = 0;
        CURSOR[1] = 0;
    }
    
    const id = createASTNode();
    setType(id, AST_BODY);
    
    if( consumeEmptyLines() ) {

        let cur = setFirstChild(id, readLine() );

        while( consumeEmptyLines() )
            cur = setSibling(cur, readLine() );
    }

    return {
        nodes, //TODO: slice
        filename
    }
}


function createCallUopNode(call: NODE_ID, op: OP_ID, a: NODE_ID) {

    setType(call, AST_CALL);

    if( __DEBUG__ ) copy_py_code_end(a, call);

    const opnode = createASTNode();
    setType(opnode, AST_OP_OP);
    setFirstChild(call, opnode);

    if( __DEBUG__ ) {
        // I guess ?
        const dst_off = 4*(opnode as number);
        const src_beg = 4*(call  as number);
        const src_end = 4*(a     as number);

        PY_CODE[ dst_off + CODE_BEG_LINE ] = PY_CODE[ src_beg + CODE_BEG_LINE ];
        PY_CODE[ dst_off + CODE_BEG_COL  ] = PY_CODE[ src_beg + CODE_BEG_COL  ];
        PY_CODE[ dst_off + CODE_END_LINE ] = PY_CODE[ src_end + CODE_BEG_LINE ];
        PY_CODE[ dst_off + CODE_END_COL  ] = PY_CODE[ src_end + CODE_BEG_COL  ];
    }

    let pyop_name = opid2opmethod[op];

    if( __DEBUG__ && pyop_name === undefined)
        throw new Error(`Unknown operator ${op}!`);

    const atype = resultType(a);

    let method   = Types[atype].__class__![pyop_name] as Fct;
    let ret_type = TYPEID_NotImplementedType;

    if( __DEBUG__ && method === undefined) {
        printNode(a);
        throw new Error(`${pyop_name} ${Types[atype].__class__?.__name__} NOT IMPLEMENTED!`);
    }

    ret_type = method[RETURN_TYPE](atype); //TODO: change...

    if( __DEBUG__ && ret_type === TYPEID_NotImplementedType) {
        printNode(a);
        throw new Error(`${pyop_name} ${Types[atype].__class__?.__name__} NOT IMPLEMENTED!`);
    }

    VALUES[call] = method;
    setResultType(call, ret_type)

    setSibling(opnode, a );

    return call;
}

function createCallOpNode(call: NODE_ID, left: NODE_ID, op: OP_ID, right: NODE_ID) {

    if( __DEBUG__ ) {
        copy_py_code_beg(left , call);
        copy_py_code_end(right, call);
    }

    if( op === OP_ASSIGN ) {

        let node_type = AST_OP_ASSIGN;

        let type = resultType(left);
        if( type === 0 ) { // unknown
            type      = resultType(right);
            node_type = AST_OP_ASSIGN_INIT;

            if(type === TYPEID_jsint)
                type = TYPEID_int;

            addSymbol(VALUES[left], type);
        }

        setType(call, node_type);
        setResultType(call, type);

        // value is first child (can be chained)...
        setFirstChild(call , right);
        setSibling   (right, left );

        return call;
    }

    if( op >= 29 ) {

        const type = resultType(left);
        setType(call, AST_OP_ASSIGN_AUG); //TODO: many nodes to store op in node_id ?
        setResultType(call, type );

        VALUES[call] = Types[type].__class__![opid2iopmethod[op-29]];
        
        const opnode = createASTNode();
        setType(opnode, AST_OP_OP);
        setFirstChild(call, opnode);

        setSibling(opnode , left);
        setSibling(left, right);

        return call;
    }

    setType(call, AST_CALL);

    const opnode = createASTNode();
    setType(opnode, AST_OP_OP);
    setFirstChild(call, opnode);

    if( __DEBUG__ ) {
        // I guess ?
        const dst_off = 4*(opnode as number);
        const src_beg = 4*(left  as number);
        const src_end = 4*(right as number);

        PY_CODE[ dst_off + CODE_BEG_LINE ] = PY_CODE[ src_beg + CODE_END_LINE ];
        PY_CODE[ dst_off + CODE_BEG_COL  ] = PY_CODE[ src_beg + CODE_END_COL  ];
        PY_CODE[ dst_off + CODE_END_LINE ] = PY_CODE[ src_end + CODE_BEG_LINE ];
        PY_CODE[ dst_off + CODE_END_COL  ] = PY_CODE[ src_end + CODE_BEG_COL  ];
    }

    let pyop_name = opid2opmethod[op];

    if( __DEBUG__ && pyop_name === undefined) {
        printNode(left);
        printNode(right);
        throw new Error(`Unknown operator ${op}!`);
    }

    const ltype = resultType(left);
    const rtype = resultType(right);

    let method   = Types[ltype].__class__![pyop_name] as Fct;
    let ret_type = TYPEID_NotImplementedType;

    if( method !== undefined )
        ret_type = method[RETURN_TYPE](rtype); //TODO: change...
    
    if( ret_type === TYPEID_NotImplementedType) {
        
        pyop_name = opid2ropmethod[op];
        
        // we NEED to invert l&r.
        let _ = left;
        left  = right;
        right = _;

        method = Types[rtype].__class__![pyop_name] as Fct;

        if( __DEBUG__ && method === undefined) {
            printNode(left);
            printNode(right);
            throw new Error(`${Types[rtype].__class__?.__name__} ${pyop_name} ${Types[ltype].__class__?.__name__} NOT IMPLEMENTED!`);
        }

        ret_type = method[RETURN_TYPE](ltype!);

        if( __DEBUG__ && ret_type === TYPEID_NotImplementedType) {
            printNode(left);
            printNode(right);
            throw new Error(`${Types[rtype].__class__?.__name__} ${pyop_name} ${Types[ltype].__class__?.__name__} NOT IMPLEMENTED!`);
        }
    }

    VALUES[call] = method;
    setResultType(call, ret_type)

    setSibling(opnode, left );
    setSibling(left  , right);

    return call;
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

export function copy_py_code_beg(src: NODE_ID, dst: NODE_ID) {

    const src_off = 4*(src as number);
    const dst_off = 4*(dst as number);

    PY_CODE[ dst_off + CODE_BEG_LINE ] = PY_CODE[ src_off + CODE_BEG_LINE ];
    PY_CODE[ dst_off + CODE_BEG_COL  ] = PY_CODE[ src_off + CODE_BEG_COL  ];
}

export function copy_py_code_end(src: NODE_ID, dst: NODE_ID) {

    const src_off = 4*(src as number);
    const dst_off = 4*(dst as number);

    PY_CODE[ dst_off + CODE_END_LINE ] = PY_CODE[ src_off + CODE_END_LINE ];
    PY_CODE[ dst_off + CODE_END_COL  ] = PY_CODE[ src_off + CODE_END_COL  ];
}