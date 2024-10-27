import { CMPOPS_LIST, genCmpOps } from "structs/BinaryOperators";
import { STypeObj } from "structs/SType";

const SType_bool = {
    
    ...genCmpOps  (CMPOPS_LIST,
        ['float', 'bool', 'int', 'jsint']),
    
} satisfies STypeObj;

export default SType_bool;