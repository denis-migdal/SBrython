import { AST_SYMBOL } from "@SBrython/sbry/ast2js/";
import Py_Exception from "@SBrython/runtime/_r_/Exceptions/Exception";
import { type, VALUES } from "@SBrython/sbry/dop";
import { SBrython } from "@SBrython/runtime";

function filter_stack(stack: string[]) {
  return stack.filter( e => e.includes('brython_') ); //TODO improves...
}

//TODO: use ~=sourcemap...
function find_astnode_from_jscode_pos(nodes: any, line: number, col: number): null|number {

  //TODO...
  /*
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
*/

  return null; //throw new Error("node not found");
}

export function stackline2astnode(stackline: StackLine, sb: SBrython): number {
  const ast = sb.getASTFor("sbrython_editor.js");
  return find_astnode_from_jscode_pos(ast.nodes, stackline[1], stackline[2])!;
}

export type StackLine = [string, number, number];

//TODO: convert
export function stack2astnodes(stack: StackLine[], sb: SBrython): number[] {
  return stack.map( e => stackline2astnode(e, sb) );
}

//TODO: add file...
export function parse_stack(stack: any, sb: SBrython): StackLine[] {


  
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

        //TODO: extract filename.
        const ast = sb.getASTFor("sbrython_editor.js");
        const node = find_astnode_from_jscode_pos(ast.nodes, line, col)!;
        if( type(node) === AST_SYMBOL)
          col += VALUES[node].length; // V8 gives first character of the symbol name when FF gives "("...

      } else {
        let pos = _.indexOf('@');
        fct_name = _.slice(0, pos);
        if( fct_name === "anonymous") //TODO: better
          fct_name = "<module>";
      }

      return [fct_name, line, col] as const;
    });
}

function debug_print_exception(err: Py_Exception, sb: SBrython) {

    console.warn("Exception", err);

    const stack = parse_stack( (err as any)._raw_err_.stack, sb);
    const nodes = stack2astnodes(stack, sb);
    //TODO: convert stack...
    // nodes[i].pycode.start.line
    const stack_str = stack.map( (l,i) => `File "[file]", line ${0}, in ${stack[i][0]}`);

    let exception_str = 
`Traceback (most recent call last):
  ${stack_str.join(`\n  `)}
Exception: [msg]`;

    console.log(exception_str);
}

function get_py_exception(_raw_err_: any, __SB__: any) {
  // @ts-ignore
  const _err_ = _raw_err_ instanceof _sb_.PythonError
              ? _raw_err_.python_exception
              // @ts-ignore
              : new _r_.JSException(_raw_err_);

  debug_print_exception(_err_, __SB__);
  
  return _err_;
}

export default {
    debug_print_exception,
    get_py_exception
};