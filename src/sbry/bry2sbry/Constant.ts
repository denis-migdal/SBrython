import { AST_LIT_BOOL, AST_LIT_FLOAT, AST_LIT_INT, AST_LIT_NONE, AST_LIT_STR } from "@SBrython/sbry/ast2js/";
import { setResultType, setType, VALUES } from "@SBrython/sbry/dop";
import { Context } from "@SBrython/sbry/bry2sbry/utils";
import { TYPEID_bool, TYPEID_float, TYPEID_int, TYPEID_jsint, TYPEID_NoneType, TYPEID_str } from "@SBrython/sbry/types";

export default function convert(dst: number, node: any, _context: Context): false|void {

    const value = node.value;
    const vtype = typeof value;
    let qname;

    if(vtype !== "object") {

        if( vtype === "boolean" ) {

            setType      (dst, AST_LIT_BOOL);
            setResultType(dst, TYPEID_bool);
            
            VALUES[dst] = value; // TODO: 2 types instead of one ?

            return;
        }

        if( vtype === "string") {
        
            setType      (dst, AST_LIT_STR);
            setResultType(dst, TYPEID_str);
        
            VALUES[dst] = value;

            return;
        }

    } else {
        qname = value.__class__.__qualname__;

        if( qname === "float") {
        
            setType      (dst, AST_LIT_FLOAT);
            setResultType(dst, TYPEID_float);
            
            VALUES[dst] = value.value;

            return;
        }

        if( qname === "NoneType" ) {
        
            setType      (dst, AST_LIT_NONE);
            setResultType(dst, TYPEID_NoneType);

            return;
        }
    }

    if( __DEBUG__ && qname !== "int" && vtype !== "number" )
        throw new Error(`Unknown type ${vtype}:${qname}`);

    setType      (dst, AST_LIT_INT);

    if( qname === "int" ) { // bigint
        setResultType(dst, TYPEID_int);
        VALUES[dst] = value.value;
    } else {
        setResultType(dst, TYPEID_jsint);
        VALUES[dst] = value;
    }
}