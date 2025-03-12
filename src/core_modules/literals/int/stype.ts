import { r } from "@SBrython/ast2js";
import { firstChild, resultType } from "@SBrython/dop";
import { binary_jsop, CMPOPS_LIST, genBinaryOps, genCmpOps, genUnaryOps, id_jsop, Int2Number, Number2Int, unary_jsop } from "@SBrython/structs/BinaryOperators";
import { CONVERT_2INT, CONVERT_INT2FLOAT } from "@SBrython/structs/Converters";
import { RET_IJBF2BOOL, RET_IJBF2FLOAT, RET_IJ2INT, RET_INT, RET_INT2INT, RET_STR } from "@SBrython/structs/ReturnTypeFcts";
import { STypeFctSubs } from "@SBrython/structs/SType";
import { addSType, STYPE_FLOAT, STYPE_INT, STYPE_JSINT, STYPE_STR, STypes } from "@SBrython/structs/STypes";

export const SType_type_int = addSType('type[int]', {
    __call__: {
        //TODO...
        return_type: RET_INT,
        substitute_call: (node: number) => {

            const other = firstChild(node) + 1;
            const other_type =resultType(other);

            //TODO use their __int__ ?
            if( other_type === STYPE_INT )
                return other;
            if( other_type === STYPE_JSINT)
                return Number2Int(other);
            if( other_type === STYPE_FLOAT )
                return r`BigInt(Math.trunc(${other}))`;

            //TODO: power...
            if( other_type === STYPE_STR ) {

                //if( node.children.length === 3)
                //    return r`BigInt(parseInt(${other}, ${node.children[2]}))`;

                //TODO: optimize if other is string litteral...
                return r`BigInt(${other})`; //, ${node.children[2]}))`; 
            }

            const otype = STypes[other_type];
            const method = otype?.__int__ as STypeFctSubs;
            if( __DEBUG__ && method === undefined )
                throw new Error(`${otype.__name__}.__int__ not defined`);
            return method.substitute_call!(node, other);
        }
    }
});

addSType('int', {

    //TODO: fix type...
    // @ts-ignore
    __class__: SType_type_int,

    __str__: {
        return_type: RET_STR,
        substitute_call(node) {
            return r`${node}.toString()`;
        }
    },

    __int__: {
        return_type: RET_INT,
        substitute_call(node, self) {
            return id_jsop(node, self);
        }
    },
    /* */
    ...genBinaryOps([
            // '**' => if "as float" could accept loss of precision.
            '**', '+', '-',
            '&', '|', '^', '>>', '<<'
        ],
        RET_IJ2INT,
        {
            convert_other: CONVERT_2INT
        }
    ),
    ...genBinaryOps(['*'], RET_INT2INT,
        {
            substitute_call(node, a, b) {

                if( resultType(node) === STYPE_FLOAT )
                    // TODO: check if really interesting...
                    return binary_jsop(node, Int2Number(a), '*', Int2Number(b) );
                
                return binary_jsop(node, a, '*', b);
            },
        }
    ),
    ...genBinaryOps(['/'], RET_IJBF2FLOAT,
        {
            convert_self : CONVERT_INT2FLOAT,
            convert_other: CONVERT_INT2FLOAT
        }
    ),
    ...genBinaryOps(['//'], RET_IJ2INT,
        {
            convert_other  : CONVERT_2INT,
            substitute_call: (node: number, self: number, other: number) => {
                return r`_b_.floordiv_int(${self}, ${other})`;
            },
        }
    ),
    ...genBinaryOps(['%'], RET_IJ2INT,
        {
            convert_other: CONVERT_2INT,
            substitute_call: (node: number, self: number, other: number) => {
                // do not handle -0
                return r`_b_.mod_int(${self}, ${other})`;
            },
        }
    ),

    ...genUnaryOps(['u.-'], RET_INT,
        {
            substitute_call: (node, a) => {

                if( resultType(node) === STYPE_FLOAT )
                    return unary_jsop(node, '-', Int2Number(a) );
                
                return unary_jsop(node, '-', a );
            },
        }
    ),
    ...genUnaryOps( ['~'], RET_INT),
    ...genCmpOps(  CMPOPS_LIST, RET_IJBF2BOOL)
    /* */

});