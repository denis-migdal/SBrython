https://docs.python.org/3/reference/lexical_analysis.html
https://github.com/brython-dev/brython/issues/2554

Tested         : 132/1894 (6.97%)
Py code        : 1494 tokens (1 file)
JS code        : -83.98%

Executed in    :  0.337s [-91.01%]   5.040ms
    PY2JS      :  0.257s [-92.35%]   3.840ms
        py2ast :  0.174s [-93.98%]   2.600ms
        astProc:  0.000s [-100.00%]   0.000ms
        ast2js :  0.083s [-73.62%]   1.240ms
    RUNTIME    :  0.080s [-79.45%]   1.200ms
        genFct :  0.020s [-66.67%]   0.300ms
        exeFct :  0.060s [-81.78%]   0.900ms

Tested         : 132/1894 (6.97%)
Py code        : 1494 tokens (1 file)
JS code        : x  6.24

Executed in    :  3.751s [x 11.12]  56.040ms
    PY2JS      :  3.360s [x 13.07]  50.200ms
        py2ast :  2.893s [x 16.62]  43.220ms
        astProc:  0.153s [xInfinity]   2.280ms
        ast2js :  0.315s [x  3.79]   4.700ms
    RUNTIME    :  0.391s [x  4.87]   5.840ms
        genFct :  0.060s [x  3.00]   0.900ms
        exeFct :  0.331s [x  5.49]   4.940ms

36K -> 11K

Possible improvements:
=====================

-> Webpack : questions
    -> index/list.
    -> constants.

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

-> createASTNode => one version that add type & code_beg (?)

-> check for unused fct / AST Node type ? (mainly op ?)
-> OP_OP => OPERATOR

-> ret_type (use call node...) ~> op: we need to construct call node & invert siblings.

-> Webpack list + globals.

-> chained assign/cmp handle it in ast2js...

MISSING
=======

-> fct kw : if left is symbol
-> current context : use let or not...
-> deduce fct return type

    ->  disabled unit tests
        -> nested scope : basic test suite.nested scopes
        -> operator "is" : # basic test suite.issue 2041
        -> dict : # basic test suite.issue 1718
        -> strings : # basic test suite.strings
        -> ternary : basic test suite.issue 1387
        -> non-ascii : # basic test suite.Korean + # basic test suite.non-ASCII variable names
    -> walrus operator (not possible...) -> requires to move out decl...
    -> fix iop... & not in / is not (+ better sym2opid)
        -> <=> & ! (char)...
        -> // ** >> << (doublement)
        -> >= += >>=   (=)
            -> need to generate idx.
            -> if > X => aug_assign node...
            -> [OPTI?] +/- offset to pass from one to another ?
    -> separate op from call... (JS shortcut)...
        -> separate system (faster & easier for +=)
            -> [a][UNR_OP]           = []...
            -> [a << 16 & b][BIN_OP] = [RET_TYPE, WRITE_FCT()] OR 2 arrays (???)
                -> not registered in Types.
                -> faster conversions (no conditions)

-> WRITE_SYMBOL ? how ?

-> classes

-> some opti

TODO
====

-> parseExpr refactor:
    -> readExpr
        -> readToken
            -> nextSymbol()
    -> readLine -> lines never starts by an expression.
        -> comments (already)
        -> keyword ~> need to handle
            -> readToken2()...
        -> VALUE + call or VALUE + EQ ?
    -> None/True/False -> in context, remove from known symbol ?

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