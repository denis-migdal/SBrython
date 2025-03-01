import { r } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { binary_jsop, CMPOPS_LIST, genBinaryOps, genCmpOps, genUnaryOps, Int2Number, Number2Int, unary_jsop } from "structs/BinaryOperators";
import { CONVERT_2INT, CONVERT_INT2FLOAT } from "structs/Converters";
import { RET_IJ2INT, RET_IJBF2BOOL, RET_IJBF2FLOAT, RET_INT, RET_JSINT, RET_JSINT2JSINT } from "structs/ReturnTypeFcts";
import { addSType, STYPE_FLOAT, STYPE_INT } from "structs/STypes";

addSType('jsint', {

    ...genBinaryOps(
        // '**' and '*' => if "as float" could accept loss of precision.
        [
            '**', '+', '-',
            '&', '|', '^', '>>', '<<' // in JS bit operations are on 32bits
        ],
        RET_IJ2INT,
        {
            convert_self : CONVERT_2INT,
            convert_other: CONVERT_2INT
        }
    ),
    ...genBinaryOps(['*'], RET_IJ2INT,
        {
            substitute_call: (node, a, b) => {

                if( node.result_type === STYPE_FLOAT )
                    // TODO: check if really interesting...
                    return binary_jsop(node, Int2Number(a), '*', Int2Number(b) );
                
                return binary_jsop(node, Number2Int(a), '*', Number2Int(b) );
            },
        }
    ),
    ...genBinaryOps(['/'], RET_IJBF2FLOAT,
        {
            convert_other: CONVERT_INT2FLOAT
        }
    ),
    ...genBinaryOps(['//'], RET_JSINT2JSINT,
        {
            substitute_call: (node: ASTNode, self: ASTNode, other: ASTNode) => {
                return r`_b_.floordiv_float(${self}, ${other})`;
            },
        }
    ),
    ...genBinaryOps(['%'], RET_JSINT2JSINT,
        {
            substitute_call: (node: ASTNode, self: ASTNode, other: ASTNode) => {
                // do not handle -0
                return r`_b_.mod_int(${self}, ${other})`;
            },
        }
    ),

    ...genUnaryOps(['u.-'], RET_JSINT, // min_safe_integer == max_safe_integer.
        {
            substitute_call: (node, a) => {

                if( node.result_type === STYPE_INT )
                    return unary_jsop(node, '-', Number2Int(a) );
                
                return unary_jsop(node, '-', a );
            },
        }
    ),
    ...genUnaryOps(['~'], // min_safe_integer == max_safe_integer.
        RET_INT,
        {
            convert_self : CONVERT_2INT
        }
    ),
    ...genCmpOps(  CMPOPS_LIST, RET_IJBF2BOOL)
    /*
    __int__: {
        return_type: () => 'int',
        call_substitute(node, self) {
            return id_jsop(node, self);
        }
    },*/
});