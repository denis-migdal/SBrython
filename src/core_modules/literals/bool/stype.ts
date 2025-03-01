import { CMPOPS_LIST, genCmpOps } from "structs/BinaryOperators";
import { RET_IJBF2BOOL } from "structs/ReturnTypeFcts";
import { addSType  } from "structs/STypes";

addSType('bool', {
    ...genCmpOps(CMPOPS_LIST, RET_IJBF2BOOL),
});