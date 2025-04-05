https://docs.python.org/3/reference/lexical_analysis.html
https://github.com/brython-dev/brython/issues/2554

PY2JS      :  2.254s [- 8.91%]  45.180ms
    py2ast :  2.043s [   =   ]  40.940ms
    astProc:  0.119s [-10.53%]   2.380ms
    ast2js :  0.093s [-69.00%]   1.860ms
Target /10-20 ? x30 faster : only support True/False :P

=> Big code x80 / x30

-> op : properly read op
-> ifblock : elif/else... [prev stuff (?) how (?) dunno]
-> fcts : parse args (+ use type id instead of VALUES ?) / SType

(8/36)
- Structures   : 0/3  // requiert "," parsing
- Functions    : 0/5  // def (requiert "," parsing) +call (requiert symbol + ctxt)
- Symbol       : 0/1
- Keywords     : 5/8  // importx2 + raise (requiert fct call)
- Operators    : 0/10
- Literals     : 2/8
- Others       : 0/4
- ControlFlows : 1/7

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

Initially:
    - parseExp => consume \n => continue...
        - ParseSymbol : seeks end of token (loop) => slice => do stuff
        - parseNumber
        - parseStr
        - parseOp
        - parseToken
- op priority

Tokens (~37):
- If
- While
- For
- Try / ExceptHandler
- IfExp

- Body
- ClassDef
- Constant (int/float/str/bool)
- Name

- Assert
- Break
- Continue
- Pass
- Raise
- Return

- FunctionDef
- keyword
- Call
- Args

- Assign
- Attribute
- AugAssign
- BinOp
- Compare
- Subscript
- UnaryOp

- Dict
- List
- Tuple

- alias / Import / ImportFrom

- JoinedStr