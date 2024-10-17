import { AST } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import CORE_MODULES from "./core_modules/lists";

type Cursor = {
    offset: number,
    line  : number,
    line_offset: number
}

export function py2ast(code: string, filename: string): AST {

    const nodes = new Array<ASTNode>();

    let cursor = {
        offset: 0,
        line: 1,
        line_offset : 0
    };

    let char;
    do {
        nodes.push( parseExpression(code, cursor) as any);
        char = code[cursor.offset];
        while( char === '\n' ) {
            char = code[++cursor.offset];
            ++cursor.line;
        }

        cursor.line_offset = cursor.offset;

    } while( char !== undefined );

    //const parser = new $B.Parser(code, filename, 'file');
	//const _ast = $B._PyPegen.run_parser(parser);
    //console.log("AST", _ast);
	return {
        nodes,
        filename
    }
}

import ast2js_convert from "./core_modules/symbol/ast2js";

function parseSymbol(code: string, cursor: Cursor) {

    const begin_str = cursor.offset;

    let car = code[cursor.offset];
    while( car >= 'a' && car <= 'z' || car >= 'A' && car <= 'Z' || car >= '0' && car <= '9' || car == '_' )
        car  = code[++cursor.offset];

    const symbol = code.slice(begin_str, cursor.offset);

    //TODO: if keyword...

    return {
        type    : "symbol",
        value   : symbol, //TODO: cf convert (search in local variables/Context...)
        children: [],
        result_type: null,

        toJS: ast2js_convert
    };
}

import ast2js_literals_int from "./core_modules/literals/int/ast2js";

function parseNumber(code: string, cursor: Cursor) {

    const begin_str = cursor.offset;

    //TODO: real...

    let car = code[cursor.offset];
    while( car >= '0' && car <= '9' )
        car  = code[++cursor.offset];

    return {
        type    : "literals.int",
        value   : code.slice(begin_str, cursor.offset),
        children: [],
        result_type: null,

        toJS: ast2js_literals_int,
    }
}

import ast2js_literals_str from "./core_modules/literals/str/ast2js";

function parseString(code: string, cursor: Cursor) {

    const begin_str = cursor.offset;

    let car = code[++cursor.offset];
    while( car !== undefined && car !== '"' && code[cursor.offset-1] !== '\\' )
        car = code[++cursor.offset];

    ++cursor.offset;
    
    return {
        type    : "literals.string",
        value   : code.slice(begin_str, cursor.offset),
        children: [],
        result_type: null,

        toJS: ast2js_literals_str,
    }
}

function parseExpression(code: string, cursor: Cursor) {
    let char = code[cursor.offset];

    let left = parseToken(code, cursor);
    char = code[cursor.offset];
    if( char === '\n')
        return left;

    let op = parseToken(code, cursor);
    op!.children[0] = left;
    op.pycode.start = left.pycode.start;

    let values = [op, parseToken(code, cursor)];

    char = code[cursor.offset];
    while( char !== '\n' ) {

        let op2   = parseToken(code, cursor);
        let right = parseToken(code, cursor);

        let op1  = values[values.length-2];
        let left = values[values.length-1];

        //TODO: handle op priority...
        // (a+b)+c

        // (a+b)
        op1!.children[1] = left;
        op1!.pycode.end  = left.pycode.end; 

        // ()+c
        op2!.children[0] = op1;
        op2.pycode.start = op1.pycode.start;

        values[values.length-2] = op2;
        values[values.length-1] = right;

        char = code[cursor.offset];
    }

    values[0]!.children[1] = values[1];
    values[0]!.pycode.end  = values[1].pycode.end;

    return values[0];
}

function parseOperator(code: string, cursor: Cursor) {

    const begin_str = cursor.offset;

    let char = code[cursor.offset++];
    /*
    while( car !== undefined && car !== '' && code[cursor.offset-1] !== '\\' )
        car = code[++cursor.offset];*/

    return {
        type    : "operators." + char,
        value   : null,
        children: [undefined, undefined],
        result_type: null,

        toJS: CORE_MODULES["operators." + char].AST2JS,
    }
}

function parseToken(code: string, cursor: Cursor) {

    // ignore whitespace
    let char = code[cursor.offset];
    while( char === ' ' || char === '\t' )
        char  = code[++cursor.offset];

    // ignore char
    if( char === undefined )
        return null;

    const start = {
        line: cursor.line,
        col : cursor.offset - cursor.line_offset
    };

    let node = null
    if( char === '"')
        node = parseString(code, cursor);
    else if( char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z' || char == '_' )
        node = parseSymbol(code, cursor);
    else if( char >= '0' && char <= '9')
        node = parseNumber(code, cursor);
    else
        node = parseOperator(code, cursor);
        //; throw new Error(`Error when parsing ${char} at ${cursor.line}:${cursor.offset - cursor.line_offset} (${cursor.offset})`);

    node.pycode = {
        start,
        end: {
            line: cursor.line,
            col : cursor.offset - cursor.line_offset
        }
    };

    //TODO: is next an operator ? -> construire arbre...
    //TODO handle operators ?

    return node;

}