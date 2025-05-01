import type { SBrython } from "@SBrython/runtime";

declare global {

    var __SBRY__: SBrython

    var __SBRY_COMPAT__: "NONE"|"PERF"|"FULL";
    var __SBRY_MODE__  : "dev"|"prod"|"test";
    var __SBRY_EXPORT__: "NONE"|"ES6"|"SBRY"|"GLOBAL";
    var $B: any;
}

export {}