/*
export function write_multi_jsop(node: NODE_ID, op: string ) {

    const first      = firstChild(node);

    const prio   = JSOperatorsPriority[op];
    const p_prio = JSOperatorsPriority[op];

    const parenthesis = p_prio < prio;
    if( parenthesis )
        w_str("(");

    w_node(first);

    setParentOPPrio(first, prio);

    let cur = nextSibling(first);
    while(cur !== 0) {

        setParentOPPrio( cur, prio + 1 );

        w_str(' && ');
        w_node(cur);

        cur = nextSibling(cur);
    }

    if( parenthesis )
        w_str(")");
}*/