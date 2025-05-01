// @ts-nocheck

import Body from "@SBrython/sbry/bry2sbry/Body";
import { AST_CLASSDEF } from "@SBrython/sbry/ast2js/list";
import { addFirstChild, addSibling, firstChild, NODE_ID, resultType, setType, VALUES } from "@SBrython/sbry/dop";
import { Context, convert_node, set_py_code_from_list } from "@SBrython/sbry/bry2sbry/utils";
import { w_sns, w_str } from "../ast2js/utils";
import TYPES, { TYPEID_type } from "../types/list";

function weak_assign(target: Record<string, any>, src: Record<string, any>) {
    for(let key in src)
        if( ! (key in target) )
            target[key] = src[key];
}

export default function convert(dst: NODE_ID, node: any, context: Context) {

    const instance_TypeID = addType({});

    const typeID = addType({
        __name__ : node.name,
        __class__: TYPES[TYPEID_type],
        __call__: method_wrapper(() => instance_TypeID, (call) => {
            //TODO: should not be here...
            w_sns("new ", firstChild(call), "(");
            //TODO: args...
            w_str(")");
        })
    });

    const klass_type = TYPES[instance_TypeID];
    const inst_type  = TYPES[typeID];

    inst_type.__class__ = klass_type;

    context.local_symbols[node.name] = typeID;
    context = context.createClassContext(typeID);

    setType(dst , AST_CLASSDEF);
    const nbChildren = node.bases.length;
    let cur    = addFirstChild(dst);

    Body(cur, node.body, context);
    if(__SBRY_MODE__ === "dev") set_py_code_from_list(cur, node.body);

    for(let i = 0; i < nbChildren ; ++i){
        cur = addSibling(cur);
        convert_node(cur, node.bases[i], context);
        const stypeID = resultType(cur);

        // could be optimized...
        weak_assign(klass_type, TYPES[stypeID]);
        weak_assign(inst_type , TYPES[stypeID-1]);
    }

    VALUES[dst] = node.name;
}