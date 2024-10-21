import { binary_jsop, GenBinaryOperator, GenEqOperator, Int2Float } from "structs/BinaryOperators";
import { STypeObj } from "structs/SType";

const SType_bool = {
    
    ...GenEqOperator({
        supported_types: ["float", "bool"],
        call_substitute(node, left, op, right) {
            return binary_jsop(node, left, op, right);
        },
    }),
    
} satisfies STypeObj;

export default SType_bool;