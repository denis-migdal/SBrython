<div align="center">
  <h1>SBrython</h1>

  <p>[Project description</p>
</div>

## SimplerBrython

https://sbrython.migdal.ovh/Editor/?test=brython
(disable privacy.reduceTimerPrecision on FF for better precision)

TARGET: (plugged)  /4 at least... [WASM/2 ?]
Executed in    :  2.654s [-15.67%]  44.340ms
    PY2JS      :  2.575s [- 5.58%]  43.020ms
        py2ast :  2.247s [   =   ]  37.540ms    __DEBUG__  py2ast cond. 
        astProc:  0.190s [x  1.24]   3.180ms -> 2.740ms -> 2.340ms
        ast2js :  0.138s [-57.88%]   2.300ms -> 2.000ms -> 1.980ms
    RUNTIME    :  0.079s [-81.20%]   1.320ms
        genFct :  0.024s [-60.78%]   0.400ms
        exeFct :  0.055s [-84.67%]   0.920ms

TODO:


- [ ] module system rewrite
    -> likely a body => is it currently used?
    -> Expr          => Expr node ? [parent ???]
    - [ ] décorreler ASTConv et AST2JS. Only one ASTConv for one Brython node type.
        - [ ] ASTConv : name is Bry name(s) / (idx | idx => handler ?).
        - [ ] AST2JS  : by hands (?) -too much OP-
        - [ ] IDX to name (for dev mode -> cf Editor)
        - [ ] documenter !
        - [ ] list generation (redo)
    - [ ] operator system rewrite (do not store op in VALUES!)

- [ ] Restaure Editor
    - [ ] Tests stats (#lines + excluded)
- [ ] documenter !
    - [ ] Production mode
        - [ ] indentation
        - [ ] optionnal checks (core_modules)
        - [ ] JS/PY code positions

- [ ] optimize value usage
    - [ ] operations (ofc)
    - [ ] some values store in CHILDREN ? => test perfs other arrays first (float32/int32)
        - INT/FLOAT/BOOL/FCT/FCT CALL
    - [ ] replace some values_str by child ast node symbols... (perte 9*8=54bytes/symb mais non-sparse array...) => another tokenizer => ptr to thingy.

- [ ] type system rewrite
    - [ ] use symbols to not pollute ?
    - [ ] write system rewrite (?) [wait for new Symbols]
        - [ ] do not store lines, get lines once full JS generated.
        - [ ] w do not accept r`` (?) => use another or spread ? (reduce nbrs of conditions).
            - [ ] w_str(1) / w_node(1) / w_sn(str, node, str, node) (do I need w_ns ?).
            - BB() / BE() + w_BR()
            - [ ] avoid Number2Int => BigInt(X) or Number(x) => w_x() ?

- [ ] functions args rewrite (?)

- write in a stack, then write final str (prevents recursivity ?)
    [s1, n1, s2]       -> consume... (reverse order for better array)
    [s3, n2, (s4, s2)] -> needs to reserve space... + merge final str?
    -> ??? // if (n1) idx_ptr => "empty spaces after consumption..."...

- [ ] ?
    - [ ] make pages/Editor depends on library (2x) ?
    - [ ] Terser : not properly inlined ??? constant ???
    - [ ] Dev mode only: asserts / __debug__ false

1. AST2JS
2. tokens2AST
3. tokenizer
=> WASM version for some steps ? (webpack loader ???)
    => if you want perfs => go AoT...
=> AoT WASM output => https://webassembly.github.io/spec/core/binary/index.html
    => easier than to write it directly in binary.
=> TS output ?

==== PARSER ====

- firstChild (ptr)
- nextSibling (ptr) instead of nbChild()
=> then swapping is only changing firstChild/nextSibling...
    => addSibling() ?
    => currentNode (consumed ?) => is it safe ? (I don't think so...)
    => firstChild needed if r_op.

- end of token (?) [^\w_] ?
- operators + priority !!!
- keywords (for/while/if)
- string parsing.
- numbers
- ()

====

f-string : https://github.com/brython-dev/brython/issues/2479

https://denis-migdal.github.io/SimplerBrython/

## Status

### Library size

- Runtime stats...

### Roadmap

#### Unit tests

-> scroll bottom...

- basic
- numbers

- classes

(7)
- dicts
- lists
- exception
- javascript objects
- bytes
- sets
- string methods

(3)
- memoryview
- f-string
- print

(10)
- pattern matching
- generators
- iterators
- import
- files open_read
- exec_eval
- decorators
- descriptors
- reflected_methods
- special methods

#### Operators
    Done
        -> add builtin functions (system, only len() for now).
        -> Symbol (desc genJS) vs SType (desc type).
            -> recursion, HELP
            -> separate desc from meta
            -> simplify code, different actions depending on the callable type.
                -> op behave a little like a call (but fct doesn't truly exists).
    TODO: SType refactor.
        (1) use new SType for len() def/call.
        (2) use new SType for function def/call.
        (3) impl operators (then use them)

        -> SType types in directories (?) [for now ?]
            -> get is required due to circularity... (LOT of circularity...)
            -> SType str/csnte/can change... (mainly __name__)
            -> write_symbol : default - throw not implemented.

        -> decorators : takes a method and return new thing.
            -> @staticmethod => no self params
            -> @classmethod  => self is klass instead of instance
            -> default       => instance method.
            -> @property

        -> policy
            -> instance methode    -> only on instance type.
            -> static/class method -> only on klass type.

            - function (klass) / method (instance).
            - builtin_function_or_method / 
        - type (circular) <- type <- int      klass <- int instance
        - type (circular) <- type <- function klass <- foo instance
        - { prop: Method|Attr }
            - => write_symbol : where/how ?
            - Symbol : {
                - stype       : ()
                - write_symbol: ()
                - write_call ?: () => type.__call__ (?)
                - call_info ?
            }
            - { __class__: { value: [], write_symbol: ()=> }  }
        - func() <- Fct
            -> __call__()           <- method
        - Klass() <- Klass ? KlassType ?
            -> __class__
                -> __name__
                -> .__call__() <- method
                -> write_symbol() <- ?
            -> __len__()            <- method
        
        1. SType refactor / helpers.
            -> genFctBinaryOp()
            -> method:
                -> return_type + call_substitute...
                -> prevent dbl search ?
        2. Classes
        3. other refactors
        4. other classes
        5. SType when import + brython interact
        6. Doc + tools.
        7. own parser/int strats/etc.

    1. addFct(local, name, ret_type, callback )
        -> { __class__ => fct class }
        -> { __name__ }
        -> {__call__} [3 new types : callable/Fct/FctType/Class/Type]
            -> also write_call.
            -> inside __class__ for STypeInt.
        -> write_symbol?: inside __class__ (?) (for a=int)
        -> pow() / divmod()
    0.
        -> new types (fcts)
            -> write_symbol / write_call
            -> generateFct(callback) helpers ?
                -> __name__ / __class__ / __call__
                    -> callable
                    -> function
                    -> class
                -> idem class.
                -> write_symbol: how ? (<- symbol ?) [could be meta?]
            -> genFct => len() / pow() / divmod()
            -> list/tuple/dict/bytes/bytearray
            -> local_symbols
                -> no needs for SType ? -> use local_symbols instead ?
                -> type(x) => write_symbol => use a _r_.int => a symbol ?
                -> add local_symbols (the types) to the generated AST (for imports)
            -> class
                -> class => is context.type really usefull ?
                    -> use parent_node_context ? (the self context ?)
                -> class: self context ? a type that is filled with class members ?
                -> fct vs method: generate ASTNode variants or use value ?
            -> op.
                -> jsop => write_binaryop version (replace old version ?)
                -> redesign op. structures ?
            -> ASTNode type
                -> (as any). => add facultative properties (op priority + as)
                    -> better convert system ?
                -> args => really need fake node ?
            -> 3 int strats : only number/only bigint/mix.
                -> only number
                    -> fast
                    -> lost of prec (rare)
                    -> good JS interact.
                    -> can't distinguish from float runtime.
                -> only bigint
                    -> slower
                    -> prec guaranteed
                    -> may require explicit conversions when interacting with JS
                    -> can distinguish runtime.
                -> mixed
                    -> middle
                    -> prec guaranteed
                    -> issue conversions -> defaults to bigint when interacting with JS.
                        -> arg conversion when call...
                    -> may distinguish runtime
                -> evaluate perfs.

    2. Add builtin functions (builder) => no need to add them to SType.
        -> e.g. len() / use it to generate __class__ ?
    3. Classes def ?
    4. Write doc ?
        -> import/export + tools.
        -> 16ms
        -> compliance over performances, performances over compliance.
        -> what SBrython is not:
            -> no debug
            -> no runtime (perf) -> options possibles but breaks perfs.
    5. Import / brython interactions ?
    6. type guards (local_symbols in if...) + parent local_symbols ???
        -> union of types...
        -> generics...
        -> ...

    -> type()/isinstance() => Type placeholder with === => _r_.int
    -> classes + builtin classes
    -> doc (simple usage/rationnal/philosophy)
        -> use Brython for dev, SBrython for prod (speed up, less security checks)
        -> Editor -> download+upload? (beta)
            -> futur: deno + lib (client+server)
    -> imports / interactions
        => merge into the same JS.
        => opti with webworker and prefetch before parsing
        => promise.all before first execution.
        => Last-Modified and If-Modified-Since
        => import map with modifications dates and URL.

    -> isinstance() / len() / divmod()
        -> function as SType...
        -> cstr / typeof / __class__
    -> type()
        { __class__ } / cstr / typeof => {__name__: "int"}
        -> substitute_value() => _r_.int 
        -> requires placeholders for types...
    => rewrite isinstance => typeof a === b // a instanceof b
    => [instanceof might cause issues]

    => other builtin (list/tuple/dict/set/bytes)
        -> listes en comprehensions ?
    => classes

    => f-string/format
    => ?

    => AST parsing strategy
        => do not enter subcontext => push to list.

    (1) constructors
        - type(a)   => a.__class__ => SType_int [for now]
            => initial local_symbols
        - isinstance() => (?)
                => type(a) === b [for now]
            => initial local_symbols
            => + after type guards...
            => TypeGuard[type] => fct only one arg.
                => also TypeIs (but meh)

        => bool()
            => https://docs.python.org/3/library/stdtypes.html#truth
        => float()
            => only str (+infinity)
                +> __float__ then __index__
        => int()
            => str + base (opt)
                +> __float__ then __index__
        => str()
            => __str__ then repr() (__repr__)

        => dict()
            => hash is intjs (32bits)
                => if no hash() => return self ?
                => then eq.

    => deduce ret type
        => improve type deduce
            => decl order.../recursive fct...
            => parcours de graphe -> changer...
                => recursive vs pile...
        => return int => jsint conversion (how?)
    => improve fct args
        => + respect original indentation...
        => + deduce params of JS fct from toString().

        (d) Brython <=> SBrython interactions / SBrython <=> JS module interactions.
            => 2x2 for Brython (export/import JS/Py space).
            => import types too...
                => when parsing import => load and parse import (if Py) ?
                => add type info in SBrython modules (AST is here too)

    (3) type() / isinstance() [Type SClass...]
        -> async + yield => compat mode : call doesn't call.
        -> await w.import()
    (4) other types / classes...

    (0) bytes type vs bytearray !!!
        -> Uint8Array() => bytes.
            .from([0xFF, 0xFF]) is faster
                => if 32<= <=126 ~> normal str else hex
                => even more faster:
                function b(str) {
                    str = str[0];
                    const result = new Uint8Array(str.length);
                    for(let i = 0; i < result.length; ++i)
                        result[i] = str.codePointAt(i);
                    return result;
                }
        -> number converted to BigInt during conversions... <- but can accept asFloat.

    (1) Compare & += operators
        (2) canRepeat ? (symbol + literals + 'simple ops on literal/symbol' (not implement ?) ).
        (3) temporary variable (+ clean-up: (t=null, x) ).
            [N=2, N=3]

    (5) type() [fake py class] / isinstance()
        - mro (+ __isinstance__ / __class__) ?
        https://docs.python.org/3/library/functions.html
    (*) fct call/signatures... (! many call signatures !)
        => deduce ret type (simple/complexe) (->)
        => call ret type
    (?) for in range => canbeint...
    (*) tuple/dict/list/set/etc.
    (*) classes
    (*) Brython interactions.
    (*) TS output ?

    -> compare
        -> comparison chains...
            -> clean at the end (garbage collection...)
                -> r = (), _r_.t.length = 0, r
                -> do we care ?
            -> 1 < 2 < 3
                    -> op, a, b => a, op, b + use symbol.
                    -> last locals.$op unnecessary.
                        -> clean it for gc ? (locals.$op= null, 3)
                            -> osef or some very specific cases issue ?
                -> no subs ? $cmp.(a, '>=', b, '>', c) simply...
                    -> evaluation issue !!!!
                
                -> subs N=2
                -> subs N=3 ([init], op) <= evaluation issue !!!!
                    -> need like Brython.
                -> repeat (N>=3)
                    -> if literals.
                    -> if symbols.
                    -> simple op.
                        -> precompute literals.
                            -> /!\ readability !
                            -> variable of literal.
                            -> during ast conversion (kills runtime unit tests xD)
                        -> only simple symbols op without side-effects (fuzzy limits so no op ?) : readability + cost of affectation vs operation.
                            -> what should we do ?
                            -> limit to N operations (?)
                            -> osef ? (rare + gain not much ?)
    -> and/or/not
    -> += (a = a + b)
        => Auto convert some operators ?
        // locals_exec.a = $B.augm_assign(locals_exec.a, '+=', 1)
        // $B.$setitem((locals.$tg = locals_exec.a), (locals.$key = 'a'), $B.augm_assign($B.$getitem(locals.$tg, locals.$key), '+=', 1))
            // setattr + getattr.
        -> += system (??) [~= jsop ?]
            ==> if not self conversion and no uncommutable reverse? replace op + by +=
        -> a = a + b -> can repeat ?
            -> well, this is an issue for future me ;)
            -> can subs. same issue than cmp op.
            -> but solution more complex. (setattr/getattr) with (a+k) in temporary variables...

-> fcts (subs. in global space)
    -> conversions methods.
    -> (!!x) for __bool__() ?
    -> float()
        -> infinity
    -> pow()
    -> etc.

-> type()
    -> TypeName2StaticType (use) + import.
    -> not necessary ?
    -> .constructor & type (is object) & substitution for substituted types.
-> isinstance()
    -> do not implement yet as type should be known at transpilation...
    -> a instanceof b => +typeof...
        -> __class__ / __instancecheck__
        -> https://peps.python.org/pep-3119/

-> attrs
    (attrs are first static attrs then non-static when init in cstr, static is used for class __new__) => getter/setter (if undefined => static) ?
    + https://jsperf.app/juqife/1/preview
        => immutable type
        => @dataclass(frozen=True)
        => Final[int]

        => generate sourcemap from AST
        (e) int => __class__ => __name__
        (f) Imports
            => can assert some info
                => class vs fcts (new or not?)
                => can deduce shape
                    - JS  => *t by default.
                    - Bry => from fct info
                => can't get ret type though.
            => return type issue (static...)
            => Register SType when module parsing/transcription.
            => .d.sbry for type definition
                => JS API quite BIG => but not runtime.
                => could be own parser in a first step.
            => wrapper for inline SType decl ? as(o, T): T ? setRetType ?
            => generic call with indirections
                => can be generated from SType
                => bigger runtime.
    
1) Finish
    => impl. built in types/fcts.
    => classes
2) JS/Brython interactions (x6)
    => import + export
    => JS + Brython JS side + Brython Py side
    => testers ?
        => small real-life code (no gotcha)
        => my own students.
3) doc
4) Own AST => for now extract Brython.
5) Compat mode...

=> full compat may be too much work TBH.
=> complex function call (almost done)
    => classes
    => imports (get types) + Brython/JS interactions (gen types - can't get ret type?).
=> testers : test your simple code (do not try edge cases)
    => bug fix -> core feature -> compat module -> edge case -> workaround_possible
    => current limitations ok/nok ?

Tot (149)

(??)
- op (??)
- = (10)
- << (2)

(??)
- bool() (2)
- str() (5)
- float() (7)
    - infinity() (3)
- int() (13)

- abs()    (3)
- pow()    (7)
- divmod() (2)

- type(2)
- isinstance (5)
- complex (12)

(19)
- except (5)
- assertRaises (4)
- assert raise (10)

-> int()
-> float()
-> divmod()
-> pow()
-> round()

x types...
-> list/tuple/range
-> set/frozenset / dict
-> bytes/bytearray/memoryview

-> in / not in
-> []
-> len() / min() / max() / .count() / .index()

-> bit_length() + bit_count() + to_bytes() + from_bytes() + hash()
-> complex + complex() + conjugate()

-> math.XXX

#### Complex functions calls ?

#### List/Tuples/etc.

#### Classes ?


#### Brython inter-op ?

## Links

https://denis-migdal.github.io/SimplerBrython/
https://denis-migdal.github.io/SimplerBrython/doc
https://groups.google.com/g/brython/c/5Y4FneO3tzU/m/KnnzMS6QAAAJ

## Implemented features

- Control flow
    - if(bool) / elif(bool) / else
    - while(true)
    - for in range()
    - for in str
    - try / catch E as e // raise Exception()
- Functions
    - def (pos_params) [requires annotations and at least 1 params]
    - call(pos_arg)
- Classes
    - methods (self as first arg)
    - attributes
    - inheritance (only 1 base).
- Literals
    - bool
    - int
    - float (ops not tested)
    - str   (ops not tested)
        - f-string
    - None (explicit = JS null / implicit = JS undefined)
- Operators
    - is/is not
    - !=, ==,
    - and, or, not
    - **, *, /, //, -, +, %, unary -
    - |, &, ^, <<, >>
    - =  (bool/int/None) + with annotations
    - [] (list/tuple[int])
- Symbols
    - JS global symbols.
- Keywords
    - pass
    - return (expr)
    - assert (raises a JS error for now)
- modules 
    - export (functions) / import (already loaded) / import browser (=globalThis)

### Not implemented (yet)

- Operation order guaranteed:
    - 3*"e" <= change order.
- Operators:
    - Operations on bool + None (you shouldn't do it anyway).
    - Operations on bytes (not common)
    - unary + (not common)
    - or/and/not on classes
        -> (__bool__() ?? __len__())
    - redefined operators on inherited literals.
        -> substitutions only possible if left-side literal.
    
### Possible optimizations

- pre-compute operations on literals.
- Write own Py2AST parser.

cf https://groups.google.com/g/brython/c/5Y4FneO3tzU/m/ftPUn9LMAAAJ

## Currently Working on...

-> list/tuple/dict
-> classes
    -> cstr.
    -> class type in context ?
-> JS API

(new features)
    - import/export
    - f-string
    - list/tuple/dict
Principle
    => base, when more cases, keep it simple when possible.
    => better type deduction (to keep detecting simple cases).
    => if necessary, push 2 PEP compliant mode.
    => Brython unit tests.

    1. Complex functions params...
    2. Classes (lot of things)
    3. Symb. substitution system (for List/Tuple/Dict)
    5. clean doc/README...
    6. Brython unit test
        - assert keyword
        - tester module
        -> editor switch test suite... + store test suite.
            -> new SBrython().
    7. AST Tree checks

    8. ADD other features... (keywords/ops...)

### ASTNode type refactor

    - =(assign) variant (how to remove ?)
    - remove type from constructor, set it depending on the filename ?

### SBrython AST

- Webworker to distribute work ?
    -> WEBASM to control allocations ?
    -> ?
- Type checker/setter after AST build.

main_body
    - parseToken()
        - if/etc. => parse other token.
            - indentation
            - :
    - a + b => (a+b)...
        => continuer ? arrêter ?
        => priorité des opérateurs... association gauche ou droite ?
    (g) op => parse
    (g) op (d) op
        => si g= (g op d)
        => sinon (g) op (d op x)

### Classes

- empty class
    - export class
    - add class to local variables
- cstr
    - get `__new__`
    - get `__init__`
    - Py_Obj => cstr : call new then init.
    -> new fix the Python authorized symbols, but doesn't change JS prototype.
- methods (self) + attr
- extends Python class (normal)
- extends JS class ?

### Missing features

    - [ ] use Brython unit tests...
        - tester module...
        - assert keyword... => plug or smthing ?

    - [ ] Check AST
        - check function call arguments type... + return type.
        - check assignations AFTER AST is built ?
        - check result_type=unknown AFTER AST is built.
            - children of assign can be unknown.
            - fctcall can be unknown if not used.
            - if deduced, set unknown ?
        -> warning on node => show in editor ?

    - [ ] py code in core_modules ? => pre-transpile
        - [ ] JS code insert

    - keywords
        - async/await
        + move some 2 keywords.

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

        - [ ] Build + usage
        - [ ] Generated JS: op(1n, '+', 1n) => need to override operators, can't know type of variables at transpilation type. In vanilla JS would simply write 1n + 1n / array[x] / - 2, etc // types hint
        - [ ] Context.options
        - [ ] How code is validated (several options + Brython)
    - figure for JS API ?

    - runtime : `_r_` vs `_b_`

## JS API

    - TODO: make a figure in transpilation doc ?
    - [Soon:] exec_py(pycode)
    - [Soon:] exec_js(jscode)
    - [Soon:] py2js(pycode)
        - py2ast(pycode) -> AST : convert python code into an AST
            - [Soon:] Python code to BrythonAST
            - convert_ast(BAST) -> AST
        - ast2js(AST) => JS : convert an AST into JS Code
    - [Soon:] JS stack to Python stack conversion


## Student projects

- [ ] Python code parsing to produce AST.
- [ ] Documentation (style+markdown+complete)
- [ ] Better editor :
    - [ ] Twice exec, one with runtime type checks
    - [ ] make asserts that will be only be performed in SBrython (no Brython)
    - [ ] scroll to
- [ ] Type
    - [ ] Better type deduction: if type === => change local type in body.
    - [ ] Deduce for in target type...
    - [ ] Generate TS code mode
    - [ ] fetch JS API types from TS. (.d.ts ???)
- [ ] CPython/PEP compliant
    - [ ] debug = true
    - [ ] async as coroutines = true
    - [ ] enforce python type = false
        - [ ] ignore variable type annotations.
        - [ ] forbid (or raise a warning) explicit type violation .
        - [ ] forbid (or raise a warning) on variable deduced type violation.
        - [ ] forbid (or raise a warning) all non-explicit unknown type.- forbid (or - - - [ ] raise a warning) when using values of unknown type.
        - [ ] runtime type checking.
    - [ ] Add features (complete SBrython)
- [ ] Py => JS Regex conversions.
- [ ] Keep python indent (e.g. if fct argument indented, indent it in JS too)
- [ ] Keep Python comments
- [ ] Stack trace sourcemap 
    - [ ] https://github.com/brython-dev/brython/issues/2476

- [ ] Opti
    - [ ] in some cases convert int into float (cste) [AST checks ?]

- [ ] comments
- [ ] list used core_module + extend core_module.
- [ ] brython better perfs...:
    - split Py2JS into Py2AST and AST2JS
    cf https://github.com/brython-dev/brython/blob/master/www/src/py2js.js

- [ ] traceback... (+ need compat mode for locals)

- [ ] SBrython
    - [ ] doc API + complete API
    - [ ] stack conversion inside it ?

## Misc


Info (TODO)
    - [ ] assert if variable is dict: ({}).__proto__ === Object.prototype or undefined
    - [ ] assert if class :  => toString starts with class
        => return Object.getOwnPropertyDescriptors(obj)?.prototype?.writable === false;
            https://stackoverflow.com/questions/526559/testing-if-something-is-a-class-in-javascript

Info
    - [ ] Arg parsing: https://github.com/brython-dev/brython/issues/2478


Simple, Speedy, Static, Small