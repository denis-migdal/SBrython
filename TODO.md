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

Major Steps
===========

-> pass unit tests (~6k) + compat (lot to implement)
-> refactors/performances
-> JS standard lib... / Python libs / Import Brython / Imports ?
-> typehints (+complex types ? (str repr, index to ID) )
-> + tools/documentation...

- http://127.0.0.1:5501/compat/

Below :
- parsing
- unit test todo
- Possible improvements
- info
- possible student projects
- documentation todo

Yet another todolist
====================

Priorities:
X. Complete stubs

7. Callable (e.g. addEventListener) -> create addHoc type for now.
    -> CallableClass [GENERIC]().
    -> Callable[[Any, Any], Awaitable[Any]]

8. Classes... (+ complete stubs) (__new__ to annotate constructor ?)
9. await ? Coroutine is ~Promise + async def return type

A() => type(A).__call__() -> calls __new__ & __init__
    -> operators always call klass fct...
    -> stubs use __new__ ?

1. Classes
    a. own unit test
    b. methods (COMPAT=NONE : no static) : /!\ Handle Self !
    c. @classmethod / @staticmethod (which one ?) [better class method?] (staticmethod for utilitary)
    d. attr (ClassVar[]) = static, else instance (PERF: getter/setter /!\ JS data vs Py op)
    e. __init__ is constructor + super.__init__() call (PERF: cstr call __init__)

X. Typehints (update stubs)
    - @property (better than Final[T])
    - Callable[]
    - async/await
    - ReadOnly[T]
    - TypedDict -> toJS : do not print klass.
    - union ~> id => { shared_props (todo) + [SUB][id1, id2, id3] }
        -> type guard to exclude -> |None... + if throw.../return/break/continue
        -> union to union (e.g. fct call with overloads)
    - overload -> like union
    - circular refs : how to ID lazy assign/reassign them ? - only for stubs ?
        -> separate AST tree build & typededuce (2 different steps)
        -> FULL doesn't care about type checking
        -> but how to do typehint (need parse/typeid...)
    - Generics (require ReturnType refactor)
    -> ... value

X. Objs
    - list/dict/tuple methods ? + TypedDict ?
    - complex/bytes (from/to bytes)
    - set + set operation
    - iterators/generators/decorators/descriptors
    - __format__ (used for fstring)

X. Unit tests
    - restaure disabled unit tests.

X. doc
    - API(SBrython)
        - fct (execute + convert + convert&execute) + option (internal functions.)
        - register (SBRY module)
    - browser (+ create) [TODO: cache?]
        - script type="text/sbrython" + flags...
            - use SBrython API
        - doc usage (add runtime...)
    + editor/benchmark links.
    + doc "import JS" for browser API.
    + clean readme.md

X. Prod
    - __debug__ true/false...
    - docstring (remove).

X. Refactors
    -> node 0 : ignore + type 0 = pass (?) => évite boucle infinies en cas d'erreurs.
    -> evaluate time to import/parse lib.
    - Unknown is Object
    - ReturnType : only CallID.
    - Merge non-inline functions types (only return type).
    - Doc: I do not typecheck, I type deduce.
    - Operator system...
    -> current_context => {} allows recursive py2ast calls... + idem ast2js...
        -> not yet.
    - clean JS output
        - methods...
        - extra ","...
        - exceptions...
    -> JS.eval (how to inline ?)
    -> == for type()
    -> error message : show code pos... + more explicit
    -> Generate declaration files
    -> CLI tools - unit tests (+ perf measure) ~> produce several lib vers.
    -> Formatted code parser (flag)
        - https://peps.python.org/pep-0008/
        - https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter
        - https://black.readthedocs.io/en/latest/
        - https://black.vercel.app/?version=stable
        - https://pypi.org/project/python-minifier/

    https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance
    + cf settings.json

    https://docs.python.org/3/library/typing.html
    -> typehint features
        -> Protocol
        -> Callable
        -> |
        -> Generics
        -> Any
        -> Never
        -> Self
        -> Literal[]
        -> ClassVar
        -> Final
        -> ReadOnly / TypedDict
        -> @dataclass + @staticmethod + @classmethod
        -> TypeIs (type guard) / TypeGuard
        -> assert_type / cast / assert_never / 
        -> @overload
        -> @override
        -> @type_check_only
        -> TYPE_CHECKING
        -> Generic callable, not possible yet: *args: P.args, **kwargs: P.kwargs
            -> kargs : not required (ok)
            -> args : tuple
                -> all required + can have other if defaults (?)
        -> PEP764 (https://discuss.python.org/t/pep-764-inlined-typed-dictionaries/78779/20)

X. Bugs/Refactors
    -> fct kw : if left is symbol
    -> current context : use let or not...
    -> deduce fct return type
    -> def args parsing (dble ")").
    -> ret_type (use call node...) ~> op: we need to construct call node & invert siblings.
    -> OP_OP => OPERATOR
    -> check for unused fct / AST Node type ? (mainly op ?)

Unit tests
==========

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
- fstring (+ "value:format")

Possible improvements:
=====================

-> Bundle optimisation (performances matter).
    -> inline DOP methods ?
    -> optimisation for global constant ?
    -> optimisation for index of lists ?
    -> regroup in same file without using webpack ? (override a step ?)

-> stup parser
    - create stubs from sources / no parse format (from JS...)
    - special parser + imports before parsing... (avoid recursivity...)

-> cache for browser parsing & watch mode

-> do I REALLY need firstChild/nextSibling ? (reorganise node order...)
    -> mainly used with operators priority...
    -> body : number of child unknown

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
            -> isinstance() / __class__ / __instancecheck__
                -> https://peps.python.org/pep-3119/
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

INFO
====

https://github.com/brython-dev/brython/issues/2548
https://github.com/brython-dev/brython/issues/2560

https://github.com/brython-dev/brython/issues/2372
https://pyperformance.readthedocs.io/usage.html#run-benchmarks

https://www.w3schools.com/python/python_ref_string.asp
https://webassembly.github.io/spec/core/binary/index.html

- [ ] assert if variable is dict: ({}).__proto__ === Object.prototype or undefined
- [ ] assert if class :  => toString starts with class
    => return Object.getOwnPropertyDescriptors(obj)?.prototype?.writable === false;
        https://stackoverflow.com/questions/526559/testing-if-something-is-a-class-in-javascript


Possible student projects
=========================

- [ ] Python code parsing to produce AST.
- [ ] Documentation (style+markdown+complete)
- [ ] Better editor :
    - [ ] Twice exec, one with runtime type checks
    - [ ] scroll to
- [ ] Type
    - [ ] Better type deduction: if type === => change local type in body.
    - [ ] Deduce for in target type...
    - [ ] Generate declaration files
    - [ ] fetch JS API types from TS. (.d.ts ???)
- [ ] CPython/PEP compliant
    - [ ] debug = true
    - [ ] async as coroutines = true
    - [ ] enforce python type = false
        - [ ] ignore variable type annotations.
        - [ ] forbid (or raise a warning) explicit type violation .
        - [ ] forbid (or raise a warning) on variable deduced type violation.
        - [ ] forbid (or raise a warning) all non-explicit unknown type.- forbid (or - - - [ ] raise a warning) when using values of unknown type.
        - [ ] runtime type checking.
    - [ ] Add features (complete SBrython)
- [ ] Py => JS Regex conversions.
- [ ] Keep python indent (e.g. if fct argument indented, indent it in JS too)
- [ ] Keep Python comments
- [ ] Stack trace sourcemap 
    - [ ] https://github.com/brython-dev/brython/issues/2476

- [ ] Opti
    - [ ] in some cases convert int into float (cste) [AST checks ?]

- [ ] comments
- [ ] list used core_module + extend core_module.

- [ ] traceback... (+ need compat mode for locals)

- [ ] SBrython
    - [ ] doc API + complete API
    - [ ] stack conversion inside it ?


## Documentation (TODO)

    - [ ] DOC !!!
        - [ ] Presentation/goal
- I want the transpiler to be as simple as possible for educational purposes (I want to put student projects on it, so that they can play with it).
- I want the generated JS to be as simple as possible to read for educational purposes (I want students to be able to read it).
- I will not implement all Python features, only some basic ones.
- I don't care to be fully CPython compliant.
- I don't care to be able to support Python libraries.
- I don't care about performances.
- I only care about stability.
- I will publish some PoC, for AST tree structure, AST tree printing, unit tests, documentations, etc. that I hope could be interesting and potentially adapted for Brython.
- I think some design choices I'll make could be interesting for Brython, so it could serve as a PoC on the way some features can be implemented/architectured.

        - [ ] Build + usage
        - [ ] Generated JS: op(1n, '+', 1n) => need to override operators, can't know type of variables at transpilation type. In vanilla JS would simply write 1n + 1n / array[x] / - 2, etc // types hint
        - [ ] Context.options
        - [ ] How code is validated (several options + Brython)
    - figure for JS API ?

    - runtime : `_r_` vs `_b_`