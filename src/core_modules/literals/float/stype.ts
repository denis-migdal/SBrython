import { r } from "ast2js";
import { CMPOPS_LIST, genBinaryOps, genCmpOps, genUnaryOps } from "structs/BinaryOperators";
import { STypeObj } from "structs/SType";

const SType_float = {
    ...genBinaryOps('float',
                    ['**', '*', '/', '+', '-'],
                    ['float', 'int', 'jsint', 'bool'],
                    {
                        convert_other: {'int': 'float'}
                    }
    ),
    ...genBinaryOps('float',
        ['//'],
        ['float', 'int', 'jsint', 'bool'],
        {
            convert_other: {'int': 'float'},
            call_substitute(node, self, other) {
                return r`_b_.floordiv_float(${self}, ${other})`;
            },
        }
    ),
    ...genBinaryOps('float',
        ['%'],
        ['float', 'int', 'jsint', 'bool'],
        {
            convert_other: {'int': 'float'},
            call_substitute(node, self, other) {
                return r`_b_.mod_float(${self}, ${other})`;
            },
        }
    ),
    ...genUnaryOps('float', ['u.-']),
    ...genCmpOps  (CMPOPS_LIST,
                   ['float', 'bool', 'int', 'jsint']),
} satisfies STypeObj;

export default SType_float;