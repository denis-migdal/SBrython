import { r } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { CMPOPS_LIST, genBinaryOps, genCmpOps, genUnaryOps, id_jsop, Int2Number } from "structs/BinaryOperators";
import { STypeObj } from "structs/SType";
import { name2SType } from "structs/STypes";

const SType_int = {

    __init__: {
        return_type: () => 'int',
        call_substitute: (node, other) => {
            const method = name2SType(other.result_type)?.__int__;
            if( method === undefined )
                throw new Error(`${other.result_type}.__int__ not defined`);
            return method.call_substitute(node, other);
        }
    },
    __int__: {
        return_type: () => 'int',
        call_substitute(node, self) {
            return id_jsop(node, self);
        }
    },
    /* */
    ...genBinaryOps('int',
        [
            // '**' and '*' => if "as float" could accept loss of precision.
            '**', '*', '+', '-',
            '&', '|', '^', '>>', '<<'
        ],
        ['int', 'jsint'],
        {
            convert_other: {'jsint': 'int'}
        }
    ),
    ...genBinaryOps('float', ['/'], ['int', 'jsint', 'float'],
        {
            convert_self : (s) => Int2Number(s, 'float'),
            convert_other: {'int': 'float'}
        }
    ),
    ...genBinaryOps('int', ['//'], ['int', 'jsint'],
        {
            convert_other: {"jsint": "int"},
            call_substitute: (node: ASTNode, self: ASTNode, other: ASTNode) => {
                return r`_b_.floordiv_int(${self}, ${other})`;
            },
        }
    ),
    ...genBinaryOps('int', ['%'], ['int', 'jsint'],
        {
            convert_other: {"jsint": "int"},
            call_substitute: (node: ASTNode, self: ASTNode, other: ASTNode) => {
                // do not handle -0
                return r`_b_.mod_int(${self}, ${other})`;
            },
        }
    ),

    // '-' could transfert 'as'
    ...genUnaryOps('int',
        ['u.-']
    ),
    ...genUnaryOps('int',
        ['~'],
    ),
    ...genCmpOps(  CMPOPS_LIST,
                   ['float', 'int', 'jsint', 'bool'] )
    /* */
} satisfies STypeObj;

export default SType_int;