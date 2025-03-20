import Types from "../list";

export function addType(typedesc: any) {

    const id = Types.length;

    const obj = Object.assign(Object.create(null), typedesc);
    Types[id] = obj;

    return id;
}