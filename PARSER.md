-> we don't know the number of children...

- generateAST
    -> split bry/sbry
        -> bry use thingy
        -> if use parser parse
        -> else use sbry + copy sbry time...
    -> merge execute/ast/generate in one global fct...

- exclude list for parser
- test parsing strat : regex vs by hand vs sticky regex...

0. parser=true -> change test.py
1. nextSymbol() ~> use regex + search...
2. => consumeSymbol => [in array] (True/False) => Build AST.
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