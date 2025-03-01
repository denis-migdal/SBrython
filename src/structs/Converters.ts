import { VALUES } from "dop";
import { ASTNode } from "./ASTNode";
import { Int2Number, Number2Int } from "./BinaryOperators";
import { STYPE_FLOAT, STYPE_INT, STYPE_JSINT } from "./STypes";

type Printable = { toString(): string };

export type Converter = (node: ASTNode) => ASTNode | [TemplateStringsArray, ...(ASTNode | Printable)[]];

export const NOCONVERT = (node: ASTNode) => node;

export const CONVERT_INT2FLOAT = (node: ASTNode) => {

    if( node.result_type === STYPE_INT )
        return Int2Number(node, STYPE_FLOAT);

    return node; // already a number...
}

export const CONVERT_2INT = (node: ASTNode) => {
    //if( node.result_type === STYPE_INT )
    //    return node;

    return Number2Int(node);
}

export function generateConvert(convert: number[]) {

    const table = new Array<number>();
    for(let i = 0; i < convert.length; i+=2)
        table[convert[i]] = convert[i+1];

    return (node: ASTNode) => {
        const src    = node.result_type;
        const target = table[src];
        if( target === undefined )
            return node;

        //TODO: improve:
        if( src === STYPE_INT)
            return Int2Number(node, target);
        if( target === STYPE_INT )
            return Number2Int(node);

        throw new Error("Unfound conversion");
    };
}