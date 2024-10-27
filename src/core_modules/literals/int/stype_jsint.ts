import { r } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { binary_jsop, CMPOPS_LIST, genBinaryOps, genCmpOps, genUnaryOps, Int2Number, Number2Int, unary_jsop } from "structs/BinaryOperators";
import { STypeObj } from "structs/SType";

const SType_jsint = {

    ...genBinaryOps('int',
        // '**' and '*' => if "as float" could accept loss of precision.
        [
            '**', '+', '-',
            '&', '|', '^', '>>', '<<' // in JS bit operations are on 32bits
        ],
        ['int', 'jsint'],
        {
            convert_self : (self) => Number2Int(self),
            convert_other: {'jsint': 'int'}
        }
    ),
    ...genBinaryOps('int', ['*'], ['int', 'jsint'],
        {
            call_substitute: (node, a, b) => {
                const opti = (node as any).as === 'float';

                if( opti ) {
                    // TODO: check if really interesting...
                    return binary_jsop(node, Int2Number(a), '*', Int2Number(b) );
                }
                
                return binary_jsop(node, Number2Int(a), '*', Number2Int(b) );
            },
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

    ...genUnaryOps('jsint',
        ['u.-'], // min_safe_integer == max_safe_integer.
        {
            call_substitute: (node, a) => {
                const opti = (node as any).as === 'int';

                if( opti ) {
                    return unary_jsop(node, '-', Number2Int(a) );
                }
                
                return unary_jsop(node, '-', a );
            },
        }
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