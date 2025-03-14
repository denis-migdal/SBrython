import Types from "../list";

export function addType(name: string, typedesc: any) { //TODO...

    const id = Types.length;

    const obj = Object.assign(Object.create(null), typedesc);
    obj.__name__ = name;

    Types[id] = obj;

    return id;
}