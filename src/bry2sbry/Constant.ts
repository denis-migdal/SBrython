import { LITERALS_BOOL, LITERALS_FLOAT, LITERALS_INT, LITERALS_NONE, LITERALS_STR } from "@SBrython/core_modules/lists";
import { setResultType, setType, VALUES } from "@SBrython/dop";
import { Context } from "@SBrython/py2ast";
import { TYPEID_bool, TYPEID_float, TYPEID_int, TYPEID_jsint, TYPEID_NoneType, TYPEID_str } from "@SBrython/types";

export default function convert(dst: number, node: any, _context: Context): false|void {

    const value = node.value;
    const vtype = typeof value;
    let qname;

    if(vtype !== "object") {

        if( vtype === "boolean" ) {

            setType      (dst, LITERALS_BOOL);
            setResultType(dst, TYPEID_bool);
            
            VALUES[dst] = value; // TODO: 2 types instead of one ?

            return;
        }

        if( vtype === "string") {
        
            setType      (dst, LITERALS_STR);
            setResultType(dst, TYPEID_str);
        
            VALUES[dst] = value;

            return;
        }

    } else {
        qname = value.__class__.__qualname__;

        if( qname === "float") {
        
            setType      (dst, LITERALS_FLOAT);
            setResultType(dst, TYPEID_float);
            
            VALUES[dst] = value.value;

            return;
        }

        if( qname === "NoneType" ) {
        
            setType      (dst, LITERALS_NONE);
            setResultType(dst, TYPEID_NoneType);

            return;
        }
    }

    if( __DEBUG__ && qname !== "int" && vtype !== "number" )
        throw new Error(`Unknown type ${vtype}:${qname}`);

    setType      (dst, LITERALS_INT);

    if( qname === "int" ) { // bigint
        setResultType(dst, TYPEID_int);
        VALUES[dst] = value.value;
    } else {
        setResultType(dst, TYPEID_jsint);
        VALUES[dst] = value;
    }
}