import { CONTROLFLOWS_IFBLOCK } from "core_modules/lists";
import { addChild, setType } from "dop";
import { Context, convert_body, convert_node } from "py2ast";

export default function convert(dst: number, node: any, context: Context) {

    let childCount = 2;

    let cur = node;
    while( "orelse" in cur && cur.orelse.length === 1 ) {

        if( ! ("test" in cur.orelse[0]) ) { // final else
            ++childCount;
            break;
        }
        cur = cur.orelse[0];
        childCount += 2;
    }

    setType(dst, CONTROLFLOWS_IFBLOCK);
    let coffset = addChild(dst, childCount);

    // if
    convert_node(coffset++, node.test, context);
    convert_body(coffset++, node.body, context);

    // else if
    cur = node;
    while( "orelse" in cur && cur.orelse.length === 1 ) {

        // cur.orelse[0] is the body
        if( ! ("test" in cur.orelse[0]) ) { // final else
            convert_node(coffset, cur.orelse, context)
            break;
        }

        cur = cur.orelse[0];

        convert_node(coffset++, cur.test, context);
        convert_body(coffset++, cur.body, context);

        childCount += 2;
    }
}

convert.brython_name = "If";