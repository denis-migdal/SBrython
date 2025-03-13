import { LITERALS_BOOL, LITERALS_FLOAT, LITERALS_INT, LITERALS_NONE, LITERALS_STR } from "@SBrython/core_modules/lists";
import { setResultType, setType, VALUES } from "@SBrython/dop";
import { Context } from "@SBrython/py2ast";
import { STYPE_BOOL, STYPE_FLOAT, STYPE_INT, STYPE_JSINT, STYPE_NONETYPE, STYPE_STR } from "@SBrython/structs/STypes";

export default function convert(dst: number, node: any, _context: Context): false|void {

    const value = node.value;
    const vtype = typeof value;
    let qname;

    if(vtype !== "object") {

        if( vtype === "boolean" ) {

            setType      (dst, LITERALS_BOOL);
            setResultType(dst, STYPE_BOOL);
            
            VALUES[dst] = value; // TODO: 2 types instead of one ?

            return;
        }

        if( vtype === "string") {
        
            setType      (dst, LITERALS_STR);
            setResultType(dst, STYPE_STR);
        
            VALUES[dst] = value;

            return;
        }

    } else {
        qname = value.__class__.__qualname__;

        if( qname === "float") {
        
            setType      (dst, LITERALS_FLOAT);
            setResultType(dst, STYPE_FLOAT);
            
            VALUES[dst] = value.value;

            return;
        }

        if( qname === "NoneType" ) {
        
            setType      (dst, LITERALS_NONE);
            setResultType(dst, STYPE_NONETYPE);

            return;
        }
    }

    if( __DEBUG__ && qname !== "int" && vtype !== "number" )
        throw new Error(`Unknown type ${vtype}:${qname}`);

    setType      (dst, LITERALS_INT);

    if( qname === "int" ) { // bigint
        setResultType(dst, STYPE_INT);
        VALUES[dst] = value.value;
    } else {
        setResultType(dst, STYPE_JSINT);
        VALUES[dst] = value;
    }
}