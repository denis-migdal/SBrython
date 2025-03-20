Target /10-20 ?

[WITHOUT NEXT SIBLING] (Benchmark) [retry...]
Py code        : 2004 tokens (1 file) [200 lines]
    PY2JS      :  2.123s [- 8.59%]  42.540ms
        py2ast :  1.912s [   =   ]  38.320ms
        astProc:  0.120s [- 5.51%]   2.400ms
        ast2js :  0.091s [-67.96%]   1.820ms [x  3.12]
    RUNTIME    :  0.069s [-82.44%]   1.380ms
        genFct :  0.018s [-73.13%]   0.360ms
        exeFct :  0.051s [-84.36%]   1.020ms
=> Things were deoptimized (ast2js x5 too slow, BUT some opti + class & co)
    => and mainly astProc (null/reported to py2ast)

x30 faster : only support True/False :P
-> we don't know the number of children when parsing...
    -> nbChild (-> nextSibling) + invert children order in op...
    -> measure loss of perfs...
        -> setSibling( createNode() ) ~> can't do both at once...
            -> firstChild is NOT always the same.

-> Body (add sibling until end...)
    -> next line...
    -> indent level... (slice(indent.length) === indent).
        -> else : end of body...
        -> special firstBody => verif EOF ?
-> If + other keywords...

- generateAST
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

- keyword[.slice()] => consume fct() => if not found => add (?)
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