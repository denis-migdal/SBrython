import { genCmpOps } from "@SBrython/structs/operators/compare";
import { TYPE_bool } from "./bases";
import { CMPOPS_LIST } from "@SBrython/structs/BinaryOperators";
import { RET_IJBF2BOOL } from "@SBrython/structs/ReturnTypeFcts";

export default Object.assign(TYPE_bool,
    {
        __name__ : "bool",
        //__class__: TYPE_type_float_,
    },
    genCmpOps(CMPOPS_LIST, RET_IJBF2BOOL),
);