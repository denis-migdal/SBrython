import { r } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { binary_jsop, CMPOPS_LIST, genBinaryOps, genCmpOps, genUnaryOps, id_jsop, Int2Number, unary_jsop } from "structs/BinaryOperators";
import { STypeFctSubs } from "structs/SType";
import { addSType, SType_bool, SType_float, SType_int, SType_jsint } from "structs/STypes";

addSType('int', {

    __init__: {
        return_type: () => SType_int,
        substitute_call: (node, other) => {
            const method = other.result_type?.__int__ as STypeFctSubs;
            if( method === undefined )
                throw new Error(`${other.result_type}.__int__ not defined`);
            return method.substitute_call!(node, other);
        }
    },
    __int__: {
        return_type: () => SType_int,
        substitute_call(node, self) {
            return id_jsop(node, self);
        }
    },
    /* */
    ...genBinaryOps(SType_int,
        [
            // '**' => if "as float" could accept loss of precision.
            '**', '+', '-',
            '&', '|', '^', '>>', '<<'
        ],
        [SType_int, SType_jsint],
        {
            convert_other: {'jsint': 'int'}
        }
    ),
    ...genBinaryOps(SType_int, ['*'], [SType_int],
        {
            substitute_call(node, a, b) {
                const opti = (node as any).as === 'float';

                if( opti ) {
                    // TODO: check if really interesting...
                    return binary_jsop(node, Int2Number(a), '*', Int2Number(b) );
                }
                
                return binary_jsop(node, a, '*', b);
            },
        }
    ),
    ...genBinaryOps(SType_float, ['/'], [SType_int, SType_jsint, SType_float],
        {
            convert_self : (s) => Int2Number(s, 'float'),
            convert_other: {'int': 'float'}
        }
    ),
    ...genBinaryOps(SType_int, ['//'], [SType_int, SType_jsint],
        {
            convert_other: {"jsint": "int"},
            substitute_call: (node: ASTNode, self: ASTNode, other: ASTNode) => {
                return r`_b_.floordiv_int(${self}, ${other})`;
            },
        }
    ),
    ...genBinaryOps(SType_int, ['%'], [SType_int, SType_jsint],
        {
            convert_other: {"jsint": "int"},
            substitute_call: (node: ASTNode, self: ASTNode, other: ASTNode) => {
                // do not handle -0
                return r`_b_.mod_int(${self}, ${other})`;
            },
        }
    ),

    ...genUnaryOps(SType_int,
        ['u.-'],
        {
            substitute_call: (node, a) => {
                const opti = (node as any).as === 'real';

                if( opti ) {
                    return unary_jsop(node, '-', Int2Number(a) );
                }
                
                return unary_jsop(node, '-', a );
            },
        }
    ),
    ...genUnaryOps(SType_int,
        ['~'],
    ),
    ...genCmpOps(  CMPOPS_LIST,
                   [SType_float, SType_int, SType_jsint, SType_bool] )
    /* */

});