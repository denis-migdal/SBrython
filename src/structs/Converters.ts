import { resultType } from "@SBrython/dop";
import { Int2Number, Number2Int } from "./BinaryOperators";
import { STYPE_INT } from "./STypes";

type Printable = { toString(): string };

export type Converter = (node: number) => number | [TemplateStringsArray, ...(number | Printable)[]];

export const NOCONVERT = (node: number) => node;

export const CONVERT_INT2FLOAT = Int2Number;
export const CONVERT_2INT      = Number2Int;

export function generateConvert(convert: number[]) {

    const table = new Array<number>();
    for(let i = 0; i < convert.length; i+=2)
        table[convert[i]] = convert[i+1];

    return (node: number) => {
        const src    = resultType(node);
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