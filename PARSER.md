https://docs.python.org/3/reference/lexical_analysis.html
https://github.com/brython-dev/brython/issues/2554

Super total : 5869 tests (~= 6000)
cat * | grep -v ^$ | grep -v ^# |  wc -l

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

Yet another todolist
====================

- restaure "Mix" tests (avoid regression...)
    - requires runtime.
    - __SB__ (global for now - ES6 later)
    + add to sbryc + doc.
- rename compat modes
- restaure disabled unit tests.
- class unit tests.

Minor Steps
===========

- pass more unit tests

- clean JS output
    - methods...
    - extra ","...
    - exceptions...

- @inlineKlass(Number) [try with lists...]
    -> JS.eval() -> how to get its type ???... OU @inline decorator ?
    -> load
    -> @decorator
    -> f-string

- == for type...
- Generate TS + JS/mix + module type...
- error message : show code pos...

- re-established previous unit tests

- auto-formatter : (formatted flag ?)
    - https://peps.python.org/pep-0008/
        - no spaces
            - Immediately inside parentheses, brackets or braces
            - Between a trailing comma and a following close parenthesis:
            - Immediately before a comma, semicolon, or colon:
            - Immediately before the open parenthesis that starts the argument list of a function call:
            - Immediately before the open parenthesis that starts an indexing or slicing:
            - More than one space around an assignment (or other) operator to align it with another: (meh)
            - Avoid trailing whitespace anywhere.
            - Always surround these binary operators with a single space on either side
            - Don’t use spaces around the = sign when used to indicate a keyword argument, or when used to indicate a default value for an unannotated function parameter
        - tuples between ()
        - Identifiers used in the standard library must be ASCII compatible
    - https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter
    - https://black.readthedocs.io/en/latest/
    - https://black.vercel.app/?version=stable
    - https://pypi.org/project/python-minifier/

Another todo
============

X. output format : "ES6"+"TypeScript" (export top level fct...) [do not test for now ?]

X. assertion failed message (more details...)
    -> "JS" : assert (global not sb...)

X. Benchmark several versions...
X. CLI tools - AoT (cf AoT Brython)
X. CLI tools - unit tests (+ perf measure)
X. Output mode : ES6 module, commonjs (module.exports) module, variable...
X. Language mode : JS, TS, WASM

Major Steps
===========

-> pass unit tests (~6k) + compat (lot to implement)
-> refactors/performances
-> JS standard lib... / Python libs / Import Brython / Imports ?
-> typehints (+complex types ? (str repr, index to ID) )
-> + tools/documentation...

Unit tests
==========

- http://127.0.0.1:5501/compat/

->  disabled unit tests
    -> strings : # basic test suite.strings
        -> string.raw()
        -> \\
    -> nested scope : basic test suite.nested scopes
    -> operator "is" : # basic test suite.issue 2041
    -> dict : # basic test suite.issue 1718
    -> non-ascii : # basic test suite.Korean + # basic test suite.non-ASCII variable names
        -> \P{L} ?
        -> check code ?
        -> range U+0001..U+007F where the valid characters are restricted to the uppercase and lowercase letters A through Z, the underscore _ and, except for the first character, the digits 0 through 9

-> abs()
-> pow() / divmod()
-> round()
-> id()
-> int() with base
-> is instance
-> is not

-> unary +

-> classes
    -> methods
        -> methods
            -> @classmethod (access class attr) - first params : cls (not in call)
            -> @staticmethod
            -> instance method by default.
        -> attrs
            NON : ne pas oublier python code !== JS code.
            -> @property : getter/setter
            -> static attr by default ? [no statics ?]
            -> instance attr in __init__(self) ~> klass ctx... (how ?)
                -> list of added self -> set at the end of __init__ ?
                    NOPE : not in local symbols !
                    ~> needs to declare in TS... (declare after __init__).
    -> Overrides op.

-> bytes
    -> from_bytes
    -> to_bytes

-> complex

-> f-string

-> [] operator
-> %=
-> & operator
-> hash
-> @ operator ?
-> del
-> assignement expressions

Format
    -> repr
    -> bit_count

Math lib
    -> Math.pi (?) - isnan

-> assert raise

-> list/strings/lamba/inline/list en compréhension
-> local/nonlocal/global/vars()

PARSING (missing)
=======

- class & methods (+qualname!)
- tuple & dict
- import
- try/raise
- for range
- ternary operator
- fstring

TODO :
======

-> Build class SType...
-> static vs instance (add first exclude flag...)

-> special method/functions (doesn't really exists)
    -> create on demand ? : assign method/function => () => {} (?) or do not support ?
    -> getattr override ?

-> fct kw : if left is symbol
-> current context : use let or not...
-> deduce fct return type
-> def args parsing (dble ")" ).

-> ret_type (use call node...) ~> op: we need to construct call node & invert siblings.

-> Bundle optimisation (performances matter).
    -> retry tenser macros (inline fcts)
    -> optimisation for global constant ?
    -> optimisation for index of lists ?
    -> regroup in same file without using webpack ? (override a step ?)

-> node 0 : ignore + type 0 = pass (?) => évite boucle infinies en cas d'erreurs.
-> OP_OP => OPERATOR
-> check for unused fct / AST Node type ? (mainly op ?)

-> evaluate import of lib.

Possible improvements:
=====================

-> stup parser
-> ... value
- create stubs from sources / no parse format (from JS...)
- special parser + imports before parsing... (avoid recursivity...)

-> do I REALLY need firstChild/nextSibling ? (reorganise node order...)
    -> mainly used with operators priority...

-> pyObject IS JS Object (?)

-> function type : only return type ? (name stored in fct / no qualname ?)

-> parseExpr refactor:
    -> readExpr
        -> readToken
            -> nextSymbol()
    -> readLine -> lines never starts by an expression.
        -> comments (already)
        -> keyword ~> need to handle
            -> readToken2()...
        -> VALUE + call or VALUE + EQ ?
        -> + typehint...
            -> typeguard in if/else/etc. => invert order... (not an issue)
    -> None/True/False -> in context + global variable, remove from known symbol ?
    -> WRITE_SYMBOL ? how ?

-> separate op from call... (JS shortcut)...
    -> separate system (faster & easier for +=)
        -> [a][UNR_OP]           = []...
        -> [a << 16 & b][BIN_OP] = [RET_TYPE, WRITE_FCT()] OR 2 arrays (???)
            -> not registered in Types.
            -> faster conversions (no conditions)

-> walrus operator (not possible...) -> requires to move out decl...
-> fix iop... & not in / is not (+ better sym2opid)
    -> <=> & ! (char)...
    -> // ** >> << (doublement)
    -> >= += >>=   (=)
        -> need to generate idx.
        -> if > X => aug_assign node...
        -> [OPTI?] +/- offset to pass from one to another ?

-> Editor/Benchmark refactor
    -> split bry/sbry in utils/generate : generateAST
        -> bry use thingy
        -> if use parser parse
        -> else use sbry + copy sbry time...
    -> merge execute/ast/generate in one global fct...

-> python formatter to remove useless spaces
    => then no need to consume them.

-> SType : array instead of obj ? (search in an array vs search in an object)