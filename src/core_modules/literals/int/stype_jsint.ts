import { r } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { CMPOPS_LIST, genBinaryOps, genCmpOps, genUnaryOps, Number2Int } from "structs/BinaryOperators";
import { STypeObj } from "structs/SType";

const SType_jsint = {

    ...genBinaryOps('int',
        // '**' and '*' => if "as float" could accept loss of precision.
        [
            '**', '*', '+', '-',
            '&', '|', '^', '>>', '<<' // in JS bit operations are on 32bits
        ],
        ['int', 'jsint'],
        {
            convert_self : (self) => Number2Int(self),
            convert_other: {'jsint': 'int'}
        }
    ),
    ...genBinaryOps('float', ['/'], ['int', 'jsint', 'float'],
        {
            convert_other: {'int': 'float'}
        }
    ),
    ...genBinaryOps('jsint', ['//'], ['jsint'],
        {
            call_substitute: (node: ASTNode, self: ASTNode, other: ASTNode) => {
                return r`_b_.floordiv_float(${self}, ${other})`;
            },
        }
    ),
    ...genBinaryOps('jsint', ['%'], ['jsint'],
        {
            call_substitute: (node: ASTNode, self: ASTNode, other: ASTNode) => {
                // do not handle -0
                return r`_b_.mod_int(${self}, ${other})`;
            },
        }
    ),

    // '-' could transfert 'as'
    ...genUnaryOps('jsint',
        ['u.-'] // min_safe_integer == max_safe_integer.
    ),
    ...genUnaryOps('int',
        ['~'], // min_safe_integer == max_safe_integer.
        {
            convert_self : (self) => Number2Int(self)
        }
    ),
    ...genCmpOps(  CMPOPS_LIST,
                   ['float', 'int', 'jsint', 'bool'] )
    /*
    __int__: {
        return_type: () => 'int',
        call_substitute(node, self) {
            return id_jsop(node, self);
        }
    },*/
} satisfies STypeObj;

export default SType_jsint;