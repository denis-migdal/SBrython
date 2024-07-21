import Py_Exception from "core_runtime/Exceptions/Exception";
import { AST } from "py2ast";
import { ASTNode } from "structs/ASTNode";

function filter_stack(stack: string[]) {
  return stack.filter( e => e.includes('brython_') ); //TODO improves...
}


function find_astnode_from_jscode_pos(nodes: ASTNode[], line: number, col: number): null|ASTNode {

  for(let i = 0; i < nodes.length; ++i) {

      if( nodes[i].jscode!.start.line > line
      || nodes[i].jscode!.start.line === line && nodes[i].jscode!.start.col > col)
          return null;

      if(    nodes[i].jscode!.end.line > line
          || nodes[i].jscode!.end.line === line && nodes[i].jscode!.end.col > col
      ) {
          let node = find_astnode_from_jscode_pos(nodes[i].children, line, col);
          if( node !== null)
              return node;
          return nodes[i];
      }
  }

  return null; //throw new Error("node not found");
}

export function stackline2astnode(stackline: StackLine, ast: AST): ASTNode {
  return find_astnode_from_jscode_pos(ast.nodes, stackline[1], stackline[2])!;
}

export type StackLine = [string, number, number];

//TODO: convert
export function stack2astnodes(stack: StackLine[], ast: AST): ASTNode[] {
  return stack.map( e => stackline2astnode(e, ast) );
}

//TODO: add file...
export function parse_stack(stack: any, ast: AST): StackLine[] {

    stack = stack.split("\n");

    const isV8 = stack[0]=== "Error"; 

    return filter_stack(stack).map( l => {

      let [_, _line, _col] = l.split(':');
  
      if( _col[_col.length-1] === ')') // V8
        _col = _col.slice(0,-1);
  
      let line = +_line - 2;
      let col  = +_col;

      --col; //starts at 1.

      let fct_name!: string;
      if( isV8 ) {
        let pos = _.indexOf(" ", 7);
        fct_name = _.slice(7, pos);
        if( fct_name === "eval") //TODO: better
          fct_name = "<module>";

        const node = find_astnode_from_jscode_pos(ast.nodes, line, col)!;
        if(node.type === "symbol")
          col += node.value.length; // V8 gives first character of the symbol name when FF gives "("...

      } else {
        let pos = _.indexOf('@');
        fct_name = _.slice(0, pos);
        if( fct_name === "anonymous") //TODO: better
          fct_name = "<module>";
      }

      return [fct_name, line, col] as const;
    });
}

function debug_print_exception(err: Py_Exception, ast: AST) {

    //TODO: many ast/files.

    console.warn("Exception", err);

    const stack = parse_stack( (err as any)._raw_err_.stack, ast);
    const nodes = stack2astnodes(stack, ast);
    //TODO: convert stack...
    const stack_str = stack.map( (l,i) => `File "[file]", line ${nodes[i].pycode.start.line}, in ${stack[i][0]}`);

    let exception_str = 
`Traceback (most recent call last):
  ${stack_str.join(`\n  `)}
Exception: [msg]`;

    console.log(exception_str);
}

export default {
    debug_print_exception
};