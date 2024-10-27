import { r } from "ast2js";
import { ASTNode } from "structs/ASTNode";
import { CMPOPS_LIST, genBinaryOps, genCmpOps} from "structs/BinaryOperators";
import { STypeObj } from "structs/SType";

const SType_str = {

    ...genCmpOps  (CMPOPS_LIST,
        ['str']),
    ...genBinaryOps("str", ["+"], ["str"]),
    ...genBinaryOps("str", ["*"], ["int", "jsint"],
        {
            convert_other  : {"int": "float"},
            call_substitute: (node: ASTNode, a: ASTNode, b: ASTNode) => {
                
                if( a.result_type !== "str" )
                    [a,b] = [b,a];

                return r`${a}.repeat(${b})`;
            }
        }),
} satisfies STypeObj;

export default SType_str;