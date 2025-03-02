import { Context } from "py2ast";

export type T_AST2JS     = (id: number) => void;
export type T_ASTCONVERT = (dst: number, src: any, context: Context) => false|void;