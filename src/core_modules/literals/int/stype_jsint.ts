import { r } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { binary_jsop, CMPOPS_LIST, genBinaryOps, genCmpOps, genUnaryOps, Int2Number, Number2Int, unary_jsop } from "structs/BinaryOperators";
import { addSType, SType_bool, SType_float, SType_int, SType_jsint } from "structs/STypes";

addSType('jsint', {

    ...genBinaryOps(SType_int,
        // '**' and '*' => if "as float" could accept loss of precision.
        [
            '**', '+', '-',
            '&', '|', '^', '>>', '<<' // in JS bit operations are on 32bits
        ],
        [SType_int, SType_jsint],
        {
            convert_self : (self) => Number2Int(self),
            convert_other: {'jsint': 'int'}
        }
    ),
    ...genBinaryOps(SType_int, ['*'], [SType_int, SType_jsint],
        {
            substitute_call: (node, a, b) => {
                const opti = (node as any).as === 'float';

                if( opti ) {
                    // TODO: check if really interesting...
                    return binary_jsop(node, Int2Number(a), '*', Int2Number(b) );
                }
                
                return binary_jsop(node, Number2Int(a), '*', Number2Int(b) );
            },
        }
    ),
    ...genBinaryOps(SType_float, ['/'], [SType_int, SType_jsint, SType_float],
        {
            convert_other: {'int': 'float'}
        }
    ),
    ...genBinaryOps(SType_jsint, ['//'], [SType_jsint],
        {
            substitute_call: (node: ASTNode, self: ASTNode, other: ASTNode) => {
                return r`_b_.floordiv_float(${self}, ${other})`;
            },
        }
    ),
    ...genBinaryOps(SType_jsint, ['%'], [SType_jsint],
        {
            substitute_call: (node: ASTNode, self: ASTNode, other: ASTNode) => {
                // do not handle -0
                return r`_b_.mod_int(${self}, ${other})`;
            },
        }
    ),

    ...genUnaryOps(SType_jsint,
        ['u.-'], // min_safe_integer == max_safe_integer.
        {
            substitute_call: (node, a) => {
                const opti = (node as any).as === 'int';

                if( opti ) {
                    return unary_jsop(node, '-', Number2Int(a) );
                }
                
                return unary_jsop(node, '-', a );
            },
        }
    ),
    ...genUnaryOps(SType_int,
        ['~'], // min_safe_integer == max_safe_integer.
        {
            convert_self : (self) => Number2Int(self)
        }
    ),
    ...genCmpOps(  CMPOPS_LIST,
                   [SType_float, SType_int, SType_jsint, SType_bool] )
    /*
    __int__: {
        return_type: () => 'int',
        call_substitute(node, self) {
            return id_jsop(node, self);
        }
    },*/
});