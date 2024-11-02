import { r } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { binary_jsop, CMPOPS_LIST, genBinaryOps, genCmpOps, genUnaryOps, id_jsop, Int2Number, Number2Int, unary_jsop } from "structs/BinaryOperators";
import { STypeFctSubs } from "structs/SType";
import { addSType, SType_bool, SType_float, SType_int, SType_jsint, SType_str } from "structs/STypes";

const SType_type_int = addSType('type[int]', {
    __call__: {
        //TODO...
        return_type: () => SType_int,
        substitute_call: (node) => {

            const other = node.children[1];
            const other_type = other.result_type

            //TODO use their __int__ ?
            if( other_type === SType_int )
                return other;
            if( other_type === SType_jsint)
                return Number2Int(other);
            if( other_type === SType_float )
                return r`BigInt(Math.trunc(${other}))`;

            //TODO: power...
            if( other_type === SType_str ) {

                //if( node.children.length === 3)
                //    return r`BigInt(parseInt(${other}, ${node.children[2]}))`;

                //TODO: optimize if other is string litteral...
                return r`BigInt(${other})`; //, ${node.children[2]}))`; 
            }

            const method = other.result_type?.__int__ as STypeFctSubs;
            if( method === undefined )
                throw new Error(`${other.result_type.__name__}.__int__ not defined`);
            return method.substitute_call!(node, other);
        }
    }
});

addSType('int', {

    //TODO: fix type...
    // @ts-ignore
    __class__: SType_type_int,

    __str__: {
        return_type: () => SType_str,
        substitute_call(node) {
            return r`${node}.toString()`;
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