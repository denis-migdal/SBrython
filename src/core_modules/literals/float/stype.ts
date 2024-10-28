import { r } from "ast2js";
import { CMPOPS_LIST, genBinaryOps, genCmpOps, genUnaryOps } from "structs/BinaryOperators";
import { addSType, SType_bool, SType_float, SType_int, SType_jsint } from "structs/STypes";

addSType('float', {
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