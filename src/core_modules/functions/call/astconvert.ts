import { Context, convert_node } from "py2ast";
import { ASTNode } from "structs/ASTNode";
import { STypeFctSubs } from "structs/SType";
import { name2SType } from "structs/STypes";

export default function convert(node: any, context: Context) {

    const name = node.func.id;
    let   ret_type = null;

    //-1) return_type must become SType ?
        // => circular deps ? => singleton getter ? gen => add...
    // 0) py2ast args => 4 different loops, compute here (=> value is free for kw_pos ?)
    // 1) local_fcts[str] = { __call__ } + context clone...
        // in convert_args => undefined ret_type.
        // NOPE => MUST BE in result_type...
        // struct with toString()
        // also RecordType + Klass Type
    // 2) deduce {} in ASTConv instead of AST2JS...
    //         => struct in result_type ? OR better children ?
    //         => (éviter de recalculer...)
    //         => set in local_fcts[str] 
    // 3) call => fetch local_fcts, call __call__.substitute_call(self, node).

    // node.args vs node.keywords
    // ...args, [undef + somekeywords], [...t], {keywords + somepos + kwargs}

    //TODO: autogenerate when fct def ?
    //TODO: parser...
        // __call__.substitute_call(self, astnode) <= can be standard
        // isClass


    // end_pos_idx / vararg_idx
    // [idx]  => name   [for the pos in {}]
    // [name] => idx|-1 [all except pos_only & vararg & kwarg -1 for in {}]
        // can generate type desc + help JS gen ?

    // 1) Pos (node.args)
    //     pos_idx (infinity if vararg)
    //     vararg_idx = pos_idx if none ?
    // i < vararg_idx >>> pos
    // i > vararg_idx >>> vararg (if last ...t)
    // i > pos_idx ==> search in kw for {} => [i]=name
        // could be removed, but harder JS usage if multi defaults.
    // kw => [name] = 0/-1  stared => {a: 4, ...stared, ...stared}.
        //        -1 => {}
        //       >=0 => pos idx
        // undefined : kwargs
    // TODO *t,**d


    // is a class ?
    const klass = name2SType(node.func.id); //TODO...
    if( klass !== undefined )
        ret_type = (klass.__init__ as STypeFctSubs).return_type();
    else {
        //TODO fct in object...

        const fct_type = name2SType( context.local_variables[name]! );
        ret_type = (fct_type.__call__ as STypeFctSubs).return_type();
    }

    // TODO: node.args // fct call argument.
    // TODO: this ?
    return new ASTNode(node, "functions.call", ret_type, klass, [
        convert_node(node.func, context ),
        ...node.args.map( (e:any) => convert_node(e, context) )
    ]);
}

convert.brython_name = "Call";