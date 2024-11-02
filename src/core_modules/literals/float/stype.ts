import { r } from "ast2js";
import { CMPOPS_LIST, genBinaryOps, genCmpOps, genUnaryOps, Int2Number } from "structs/BinaryOperators";
import { STypeFctSubs } from "structs/SType";
import { addSType, SType_bool, SType_float, SType_int, SType_jsint, SType_str } from "structs/STypes";


const SType_type_float = addSType('type[float]', {
    __call__: {
        //TODO...
        return_type: () => SType_float,
        substitute_call: (node) => {

            const other = node.children[1];
            const other_type = other.result_type

            //TODO use their __int__ ?
            if( other_type === SType_int )
                return Int2Number(other);
            if( other_type === SType_float || other_type === SType_jsint)
                return other_type;

            //TODO: power...
            if( other_type === SType_str ) {

                if( other.type === "literals.str" ) {
                    if( other.value === "inf" || other.value === "infinity" )
                        return "Number.POSITIVE_INFINITY";
                    if( other.value === "-inf"|| other.value === "-infinity")
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
        return_type: () => SType_str,
        substitute_call(node) {
            return r`_b_.float2str(${node})`;
        }
    },
    
    ...genBinaryOps(SType_float,
                    ['**', '*', '/', '+', '-'],
                    [SType_float, SType_int, SType_jsint, SType_bool],
                    {
                        convert_other: {'int': 'float'}
                    }
    ),
    ...genBinaryOps(SType_float,
        ['//'],
        [SType_float, SType_int, SType_jsint, SType_bool],
        {
            convert_other: {'int': 'float'},
            substitute_call(node, self, other) {
                return r`_b_.floordiv_float(${self}, ${other})`;
            },
        }
    ),
    ...genBinaryOps(SType_float,
        ['%'],
        [SType_float, SType_int, SType_jsint, SType_bool],
        {
            convert_other: {'int': 'float'},
            substitute_call(node, self, other) {
                return r`_b_.mod_float(${self}, ${other})`;
            },
        }
    ),
    ...genUnaryOps(SType_float, ['u.-']),
    ...genCmpOps  (CMPOPS_LIST,
                   [SType_float, SType_int, SType_jsint, SType_bool]),
});

export default SType_float;