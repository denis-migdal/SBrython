https://docs.python.org/3/reference/lexical_analysis.html
https://github.com/brython-dev/brython/issues/2554

PY2JS      :  2.254s [- 8.91%]  45.180ms
    py2ast :  2.043s [   =   ]  40.940ms
    astProc:  0.119s [-10.53%]   2.380ms
    ast2js :  0.093s [-69.00%]   1.860ms
Target /10-20 ? x30 faster : only support True/False :P

=> Big code x80 / x30

-> fcts (2+1): parse args (+ use type id instead of VALUES ?) / SType
    -> need context/symbol to be able to call it later...
-> op (10):
    - one ID per op
    - true op parsing (type etc)
    - py op priority
    - op refactor
    - properly read op
    - other types of op
-> structs (2)
    -> dict (peu utile pour le moment...)
    -> tuple : "," est une sorte d'opérator, tuple pas besoin de ()...
        -> parseExpr x 2 ? (with expect / without expect ",")...
-> class
-> try/catch/finally/else + raise (+ a way to assert it...) [assert in else ?]
-> f-string

(18/46)
- ControlFlows : 3/7 (tryblock(_catch), for_range (-requires fct call), ternary ~= operator)
- Operators    : 0/10
- Structures   : 1/3
- Functions    : 0/5  // def (requiert "," parsing) +call (requiert symbol + ctxt)
- Symbol       : 0/1// requiert "," parsing
- Keywords     : 5/8  // importx2 + raise (requiert call)
- Others       : 3/4 (class)
- Literals     : 6/8 (fstring)

- utils/generate : generateAST (refactor)
    -> split bry/sbry
        -> bry use thingy
        -> if use parser parse
        -> else use sbry + copy sbry time...
    -> merge execute/ast/generate in one global fct...
- exclude list for parser

- test parsing strat : regex vs by hand vs sticky regex...

0. use test.py for tests
3. => add others keywords...
4. => unknown symbol (ID) <- name.
X. [nextTokenType?] numerics/strings
X. op priority (requires nextSibling for the AST tree...)