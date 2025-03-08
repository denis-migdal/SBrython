import { CMPOPS_LIST, genCmpOps } from "@SBrython/structs/BinaryOperators";
import { RET_IJBF2BOOL } from "@SBrython/structs/ReturnTypeFcts";
import { addSType  } from "@SBrython/structs/STypes";

addSType('bool', {
    ...genCmpOps(CMPOPS_LIST, RET_IJBF2BOOL),
});