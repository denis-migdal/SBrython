import { r } from "ast2js";
import { LITERALS_STR } from "core_modules/lists";
import { VALUES } from "dop";
import { CMPOPS_LIST, genBinaryOps, genCmpOps, genUnaryOps, Int2Number } from "structs/BinaryOperators";
import { CONVERT_INT2FLOAT } from "structs/Converters";
import { RET_IJBF2BOOL, RET_IJBF2FLOAT, RET_FLOAT, RET_STR } from "structs/ReturnTypeFcts";
import { STypeFctSubs } from "structs/SType";
import { addSType, STYPE_FLOAT, STYPE_INT, STYPE_STR } from "structs/STypes";


export const SType_type_float = addSType('type[float]', {
    __call__: {
        //TODO...
        return_type: RET_FLOAT,
        substitute_call: (node) => {

            const other = node.children[1];
            const other_type = other.result_type

            //TODO use their __int__ ?
            if( other_type === STYPE_INT )
                return Int2Number(other);
            if( other_type === STYPE_FLOAT || other_type === STYPE_INT)
                return other_type;

            //TODO: power...
            if( other_type === STYPE_STR ) {

                const other_value = VALUES[other.id];

                if( other.type_id === LITERALS_STR ) {
                    if( other_value === "inf" || other_value === "infinity" )
                        return "Number.POSITIVE_INFINITY";
                    if( other_value === "-inf"|| other_value === "-infinity")
                        return "Number.NEGATIVE_INFINITY";
                }

                //if( node.children.length === 3)
                //    return r`BigInt(parseInt(${other}, ${node.children[2]}))`;

                //TODO: optimize if other is string litteral...
                return r`parseFloat(${other})`; //, ${node.children[2]}))`; 
            }

            const method = other.result_type?.__int__ as STypeFctSubs;
            if( method === undefined )
                throw new Error(`${other.result_type.__name__}.__int__ not defined`);
            return method.substitute_call!(node, other);
        }
    }
});

addSType('float', {

    // @ts-ignore
    __class__: SType_type_float,

    __str__: {
        return_type: RET_STR,
        substitute_call(node) {
            return r`_b_.float2str(${node})`;
        }
    },
    
    ...genBinaryOps(['**', '*', '/', '+', '-'], RET_IJBF2FLOAT,
                    {
                        convert_other: CONVERT_INT2FLOAT
                    }
    ),
    ...genBinaryOps(['//'], RET_IJBF2FLOAT,
        {
            convert_other: CONVERT_INT2FLOAT,
            substitute_call(node, self, other) {
                return r`_b_.floordiv_float(${self}, ${other})`;
            },
        }
    ),
    ...genBinaryOps(['%'], RET_IJBF2FLOAT,
        {
            convert_other: CONVERT_INT2FLOAT,
            substitute_call(node, self, other) {
                return r`_b_.mod_float(${self}, ${other})`;
            },
        }
    ),
    ...genUnaryOps(['u.-']    , RET_FLOAT),
    ...genCmpOps  (CMPOPS_LIST, RET_IJBF2BOOL),
});