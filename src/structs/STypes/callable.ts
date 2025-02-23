import { ASTNode } from "structs/ASTNode";
import type { SType, SType_Unknown, Symbl } from "./";

export interface SType_Callable extends SType {
    __call__: Symbl<SType_Unknown>
}

export interface Symbol_Callable<T extends SType_Callable> extends Symbl<T> {
    write_call : (call: ASTNode) => void;
    getCallType: (this: SType, call: ASTNode) => Symbol_Callable<T>;
}