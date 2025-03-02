import { r } from "ast2js";
import { firstChild, resultType } from "dop";
import { CMPOPS_LIST, genBinaryOps, genCmpOps} from "structs/BinaryOperators";
import { CONVERT_INT2FLOAT } from "structs/Converters";
import { RET_IJ2STR, RET_INT, RET_STR, RET_STR2BOOL, RET_STR2STR } from "structs/ReturnTypeFcts";
import { STypeFctSubs } from "structs/SType";
import { addSType, STYPE_STR, STypes } from "structs/STypes";

export const SType_type_str = addSType('type[str]', {
    __call__: {
        //TODO...
        return_type: RET_STR,
        substitute_call: (node) => {

            const other = firstChild(node)+1;
            const other_type = resultType(other);

            //TODO use their __int__ ?
            if( other_type === STYPE_STR )
                return other;

            const method = STypes[other_type]?.__str__ as STypeFctSubs;
            if( method === undefined )
                throw new Error(`${STypes[other_type].__name__}.__str__ not defined`);
            return method.substitute_call!(other);
        }
    }
});

addSType('str', {

    // @ts-ignore
    __class__: SType_type_str,

    __len__: {
        return_type: RET_INT,
        substitute_call: (_) => {
            return r`${firstChild(_) + 1}.length`;
        }
    },

    ...genCmpOps   (CMPOPS_LIST, RET_STR2BOOL),
    ...genBinaryOps(["+"]      , RET_STR2STR),
    ...genBinaryOps(["*"]      , RET_IJ2STR,
        {
            convert_other  : CONVERT_INT2FLOAT,
            substitute_call: (node: number, a: number, b: number) => {
                
                if( resultType(a) !== STYPE_STR )
                    [a,b] = [b,a];

                return r`${a}.repeat(${b})`;
            }
        }),
});