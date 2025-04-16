import { NODE_ID, TYPE_ID } from "@SBrython/sbry/dop";
import { JS_NAME, RETURN_TYPE, TYPEID, WRITE_CALL } from "./types";
import TYPES, { TYPEID_type } from "../list";

const TypeKlass = TYPES[TYPEID_type];

export function initBuiltinClass(instance: TYPE_ID,
                                 klass   : TYPE_ID,
                                 name    : string,
                                 jsname  : string,
                                ) {

    const Klass = TYPES[klass];

    TYPES[instance].__class__ = Klass;

    Klass.__class__ = TypeKlass;
    Klass.__name__  = Klass.__qualname__ = name;
    Klass[JS_NAME]  = jsname;

    return Klass;
}

export function add_method( target  : any,
                            name    : string,
                            RET_TYPE: (o: number) => number,
                            write   : (call: NODE_ID) => void) {

    const r = Object.create(null);

    r.__name__     = name;
    r.__qualname__ = `${target.__qualname__}.${name}`;
    r.__call__     = r;

    r[RETURN_TYPE] = RET_TYPE;
    r[WRITE_CALL]  = write;

    TYPES[r[TYPEID] = TYPES.length] = r;

    target[name] = r;
}

export function create_function(name    : string,
                                RET_TYPE: (o: number) => number,
                                write   : (call: NODE_ID) => void) {

    const r = Object.create(null);

    r.__qualname__ = r.__name__ = name;
    r.__call__     = r;

    r[RETURN_TYPE] = RET_TYPE;
    r[WRITE_CALL]  = write;

    const id = r[TYPEID] = TYPES.length as TYPE_ID;
    TYPES[id] = r;

    return id;
}