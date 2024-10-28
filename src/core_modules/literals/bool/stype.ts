import { CMPOPS_LIST, genCmpOps } from "structs/BinaryOperators";
import { addSType, SType_bool, SType_float, SType_int, SType_jsint } from "structs/STypes";

addSType('bool', {
    
    ...genCmpOps  (CMPOPS_LIST,
        [SType_float, SType_bool, SType_int, SType_jsint]),
    
});