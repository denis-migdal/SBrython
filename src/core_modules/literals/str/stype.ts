import { r } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { CMPOPS_LIST, genBinaryOps, genCmpOps} from "structs/BinaryOperators";
import { STypeObj } from "structs/SType";
import { addSType, SType_int, SType_jsint, SType_str } from "structs/STypes";

addSType('str', {

    ...genCmpOps  (CMPOPS_LIST,
        [SType_str]),
    ...genBinaryOps(SType_str, ["+"], [SType_str]),
    ...genBinaryOps(SType_str, ["*"], [SType_int, SType_jsint],
        {
            convert_other  : {"int": "float"},
            substitute_call: (node: ASTNode, a: ASTNode, b: ASTNode) => {
                
                if( a.result_type !== SType_str )
                    [a,b] = [b,a];

                return r`${a}.repeat(${b})`;
            }
        }),
});