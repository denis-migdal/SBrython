import save from "../save.js";

const OP_NAME    = 0;
const OP_PYOP    = 1;
const OP_PY_PRIO = 2;
const OP_JSOP    = 3;
const OP_JS_PRIO = 4;
const OP_PYNAME  = 5;
const OP_RPYNAME = 6;
const OP_IPYNAME = 7;
const OP_IS_UNARY= 8;

export default async function genOperators() {

    const path = "./src/sbry/structs/operators/";

    const data = (await import(`../../${path}/list.json`, {with: {type: "json"}})).default;

    let constants = "";
    let pyop_prio = "";
    let jsop_prio = "";

    let opid2pyname    = "";
    let opid2rpyname   = "";
    let opid2ipyname   = "";
    let opid2jsop      = "";
    let opsymbol2opid  = "";
    let opsymbol2uopid = "";

    const pad = Math.max(...data.map( op => op[OP_NAME].length));

    for(let i = 0; i < data.length; ++i) {

        const op = data[i];

        constants += `export const OP_${op[OP_NAME].padEnd(pad)} = ${i} as const;\n`;
        //export const OP_BIT_OR     =  0 as const; // prio 5

        pyop_prio += `\t${op[OP_PY_PRIO]},\n`;
        jsop_prio += `\t${op[OP_JS_PRIO]},\n`;

        const pyname = op[OP_PYNAME];
        if( pyname !== null)
            opid2pyname += `\t"__${pyname}__",\n`;

        let rname = op[OP_RPYNAME];
        if(rname === undefined)
            rname = `r${pyname}`;

        if( rname !== null)
            opid2rpyname += `\t"__${rname}__",\n`;

        let iname = op[OP_IPYNAME];
        if(iname === undefined)
            iname = `i${pyname}`;

        if( iname !== null)
            opid2ipyname += `\t"__${iname}__",\n`;

        opid2jsop    += `\t"${op[OP_JSOP]}",\n`;

        if( op[OP_IS_UNARY] )
            opsymbol2uopid+= `\t"${op[OP_PYOP]}": OP_${op[OP_NAME]},\n`;
        else
            opsymbol2opid += `\t"${op[OP_PYOP]}": OP_${op[OP_NAME]},\n`;
    }

    // can't brand it as I need to perform arithmetic operations on it...
    let result = "export type OP_ID = number;\n\n";

    result += constants + "\n";
    result +=
`// https://docs.python.org/3/reference/expressions.html#operator-precedence
// the higher the more priority
export const pyop_priorities = [\n${pyop_prio}];\n\n`;

    result +=
`// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table
// the higher the more priority
export const jsop_priorities = [\n${jsop_prio}];\n\n`;

    result += `export const opid2opmethod  = [\n${opid2pyname}]\n\n`;
    result += `export const opid2ropmethod = [\n${opid2rpyname}]\n\n`;
    result += `export const opid2iopmethod = [\n${opid2ipyname}]\n\n`;

    result += `export const opid2jsop = [\n${opid2jsop}]\n\n`;

    result += `export const opsymbol2opid  = {\n${opsymbol2opid }};\n\n`;
    result += `export const opsymbol2uopid = {\n${opsymbol2uopid}};\n\n`;

    result += "export const OP_EQ2IS = OP_CMP_IS - OP_CMP_EQ;";
    

    await save(`${path}/index.ts`, result);

/*
    export const OP_UNR_PLUS   = 18 as const; // prio 11
    export const OP_UNR_MINUS  = 19 as const; // prio 12
    export const OP_BIT_NOT    = 20 as const; // prio 12
    export const OP_BOOL_NOT   = 27 as const; // prio 3
*/
}