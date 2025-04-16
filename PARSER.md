https://docs.python.org/3/reference/lexical_analysis.html
https://github.com/brython-dev/brython/issues/2554

PY2JS      :  2.254s [- 8.91%]  45.180ms
    py2ast :  2.043s [   =   ]  40.940ms
    astProc:  0.119s [-10.53%]   2.380ms
    ast2js :  0.093s [-69.00%]   1.860ms
Target /10-20 ? x30 faster : only support True/False :P

Currently : py2ast x2 slower than ast2js => overall +50% slower.
But : py2ast 90% of exec time => 85% faster => ~6.6x faster (?)

-> Added Expr parsing (with op priority & type deduction)
    -> in a first time went from x15 -> x10 (I was kind of sad - no clues why - one addition ???)
    -> then -> ~x25-30 py2ast (WTF xD) -> some opti.
    -> then x15 again when added new op... (code size ???)
    -> then x30...

32k -> 9.9k

=> Big code x80 / x30

Possible improvements:
=====================

-> python formatter to remove useless spaces
    => then no need to consume them.
-> node 0 : ignore + type 0 = pass (?) => évite boucle infinies en cas d'erreurs.
-> Editor/Benchmark refactor
    -> split bry/sbry in utils/generate : generateAST
        -> bry use thingy
        -> if use parser parse
        -> else use sbry + copy sbry time...
    -> merge execute/ast/generate in one global fct...
    -> exclude list for parser
-> test parsing strat : regex vs by hand vs sticky regex...
-> SType : array instead of obj ? (éviter quand même ?)

-> /!\ startup time + parsing time (difficult to eval...)
-> regroup in same file without using webpack...

-> Webpack list + globals.

MISSING
=======

-> start unit tests
    -> consume # comments.
    -> ctx (almost done test with fct & affectation)
    -> separate op from call...

-> complete op
-> classes

-> some opti

TODO
====

-> check for unused fct / AST Node type ? (mainly op ?)
-> OP_OP => OPERATOR
-> ret_type (use call node...) ~> op: we need to construct call node & invert siblings.
- Expr with parenthesis (sub expr to handle tuples ? )

-> parseExpr refactor:
    -> None/True/False -> in context, remove from known symbol ?
    -> fct : if node is EQ => transforms into kw arg ?
        => /!\ arg context !
    -> readExpr
        -> readToken
            -> nextSymbol()
    -> readLine
        -> str
            -> if known symbol
            -> elif ( => call
            -> else likely assign
        -> EQ (ou assimilés)
            -> /!\ destructuring = tuple / with/without ","
            -> right side is Expr
        -> fct/class call
            -> parseFct
        -> known symbols.
            -> call fct...

-> op (10):
-> affectation requires context array...
-> start to pass unit tests...
-> fcts:
    -> need context/symbol to be able to call it later... (array)
    -> correct pycode positions in fct def/call
-> structs (2)
    -> dict (peu utile pour le moment...)
    -> tuple : "," est une sorte d'opérator, tuple pas besoin de ()...
        -> parseExpr x 2 ? (with expect / without expect ",")...
-> class
    -> qualname in ctx for classes ?
-> try/catch/finally/else + raise (+ a way to assert it...) [assert in else ?]
-> f-string

(22/46)
- Symbol       : 0/1// requiert "," parsing
- Operators    : 0/10

- Others       : 3/4 (class)
- Functions    : 4/5 (method)

- Structures   : 1/3

- Keywords     : 5/8  // importx2 + raise (requiert call)
- ControlFlows : 3/7 (tryblock(_catch), for_range (-requires fct call), ternary ~= operator)

- Literals     : 6/8 (fstring)