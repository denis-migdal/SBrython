<div align="center">
  <h1>SBrython (Alpha version)</h1>

  <p>Write your own Websites and WebApps in Python.</p>
</div>

## SBrython

SBrython enables to execute Python codes in the Browser, by efficiently converting them into JavaScript, TypeScript, or WASM.

SBrython perfectly integrates with existing Python and Web development tools. SBrython enables you to easily interact with existing JavaScript/TypeScript codes/libraries, as well as with the browser APIs.

SBrython also offers several options to tweak the generation of JavaScript/TypeScript/WASM to better match your needs :
- `compat`: compatibility level with the Python standard:
   - `NONE`: generate clean and fastest JS/TS code, doesn't require a runtime library.
   - `PERF`: generate unclean and fast JS/TS code, requires a small runtime library.
   - `FULL`: fully compliant with the Python standard.
- TODO: output options
- TODO: AOT/JIT
- TODO: production/dev mode

⚠ SBrython is still in alpha version, lot of features aren't available yet.

### Conversion

TODO: intro + in browser + API

#### CLI

The `sbryc` command converts python files into JS, TS, or WASM files. Its usage is rather simple:
```shell
./tools/sbryc foo.py
```

Currently, this command accepts several options:
- `--compat NONE|PERF|FULL`: the level of Python compliance.
- `--outDir $DST_DIR`: the directory where the generated files are saved.
- `--watch`: the generated files are updated when the Python source files are modified.
- `--verbose`: print informations.
- `--help`: print the commande usage.

💡 If `-` is given instead of a file, `sbryc` read the content of the standard input and write the generated code in the standard output, e.g.:
```shell
$ echo "a = 1+1" | ./tools/sbryc - --compat PERF
var a = 1n+1n
```

⚠ On Windows, `sbryc` might require WSL.

### Autocompletion

SBrython stubs files are located in the `./stubs/` directory. Addind this folder to your `PYTHONPATH` will enable autocompletion features in your editor.

## Notes:

https://sbrython.migdal.ovh/Editor/?test=brython&merge=true
https://sbrython.migdal.ovh/Editor/
(disable privacy.reduceTimerPrecision on FF for better precision)

### Roadmap

0. status... / roadmap...
1. Parser (pass unit tests)
2. Classes def.
3. base type methods (str, int/float/bool, lists/dicts/sets -> type is a fct).
4. complex/bytes (from/to bytes)
5. iterators/generators/decorators/descriptors
6. Final[] => const/readonly

X. __debug__ & assert remove in prod mode /!\ keep assert if Benchmark...
X. Import JS module -> .pyi
X. Import Brython modules (?)
X. Write documentations/make it usable/tools/AoT build/gen ES6 modules
    -> philosophy
X. Real-life test suite & compare with CPython
X. WASM/TS output
X. Better type deduction (+fct shape ID...) + type guard (__class__ / type / instanceof)
X. File API

### ...

TARGET: (plugged)  /4 at least... [WASM/2 ?]
Executed in    :  2.654s [-15.67%]  44.340ms
    PY2JS      :  2.575s [- 5.58%]  43.020ms
        py2ast :  2.247s [   =   ]  37.540ms
        astProc:  0.190s [x  1.24]   3.180ms
        ast2js :  0.138s [-57.88%]   2.300ms
    RUNTIME    :  0.079s [-81.20%]   1.320ms
        genFct :  0.024s [-60.78%]   0.400ms
        exeFct :  0.055s [-84.67%]   0.920ms

           __DEBUG__  py2ast cond.    bry2sbry    (type system+write system)
3.180ms -> 2.740ms -> 2.340ms      -> 2.060ms   -> 2.060ms (1.22x)
2.300ms -> 2.000ms -> 1.980ms      -> 2.060ms   -> 1.860ms (3.43x)

== classes first ==
    + no self subs in symbol...
    -> first __add__ static
        -> it uses class not instance...
        -> new call system (and method call system)
            -> a.foo(a,b) => fct or method...
            -> real fct call vs subst. call...
                -> can't access subst. call as an object.
        -> needs a new system + a.foo() issue... => binded... => but write too??? -no direct calls ????- => at the class level ???
    -> method_wrapper args... (redo...)
        -> call_method args...
        -> call_node, ... (?)
    -> remove __abs__ / __ceil__ direct calls... (they are special...)
        __x__ => issues???
    - klass.method() vs foo()
        -> method: handle both at once ?
            => how to know if fct or attribute ???
            => needs a function ID for each... (but too much ID... but need it...)
                [due to resultTypeID...]
                => __add__ : twice (klass + instance...)
                    => declare both at once...

- once done, present arch here:
https://github.com/brython-dev/brython/issues/2548

https://github.com/brython-dev/brython/issues/2560

Fct shape ID
-> to str to quick compare/ID get.
-> compatibility ??? get Return Type (conditional...) ???

== test system ==

Command-line + set of scripts (can we build them without issues)
https://github.com/brython-dev/brython/issues/2372
-> https://pyperformance.readthedocs.io/usage.html#run-benchmarks

== STR ==
- strip
- replace
- find/index
- lower/upper/capitalize
- splits
- startsWith/endsWith
- count
- join
- replace
- slice
- in
- isupper/islower
- isidentifier/isnumeric
- removeprefix/suffix
- partition

https://www.w3schools.com/python/python_ref_string.asp

- chr/ord
- bytes / encode/decode
- repr ?

- maketrans/translate -> requiert dicts
- \N
- codecs
- klass
- stdout
- format

    - [ ] strings/string_methods/lists/dicts/sets
    - [ ] complex / bytes (from/to bytes)
    - [ ] classes.py
    - [ ] special methods
    - [ ] imports / js obj / brython interactions
    - [ ] iterators/generators/decorators/descriptors
    - [ ] Final[] decorator (const decl).
    - [ ] file API ??
    - [ ] type guard (type() / .__class__)
    - latter
        - => pow() => ** [la merde à implémenter...] => __pow__ ??
        - JS operator "."...
- [ ] documenter !
    - [ ] Production mode
        - [ ] indentation
        - [ ] optionnal checks (core_modules)
        - [ ] JS/PY code positions
    - [ ] bry2sbry
- [ ] print/assert : use stackline...

- [ ] make pages/Editor depends on library (2x) ?

limits : type unions/deduction + unknown type (bigger runtime) + (?)
=> WASM version for some steps ? (webpack loader ???)
    => if you want perfs => go AoT...
=> AoT WASM output => https://webassembly.github.io/spec/core/binary/index.html
    => easier than to write it directly in binary.
=> TS output ?

- [ ] ?
    - [ ] Terser : not properly inlined ??? constant ???
    - [ ] Dev mode only: asserts / __debug__ false

## Roadmap

### Current unit test file

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

-> print

-> https://docs.python.org/3/library/functions.html#callable
cf binaryop file...

### Unit tests

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

### Operators

    -> add builtin functions (system, only len() for now).
    -> klass
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

        2. Classes
        5. Types when import + brython interact
        6. Doc + tools.
        7. own parser/int strats/etc.

        -> pow() / divmod()
        -> new types (fcts)
            -> genFct => len() / pow() / divmod()
            -> list/tuple/dict/bytes/bytearray
            -> local_symbols
                -> add local_symbols (the types) to the generated AST (for imports)
            -> class
                -> class => is context.type really usefull ?
                    -> use parent_node_context ? (the self context ?)
                -> class: self context ? a type that is filled with class members ?
                -> fct vs method: generate ASTNode variants or use value ?

    4. Write doc ?
        -> import/export + tools.
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
    -> imports / interactions
        => merge into the same JS.
        => opti with webworker and prefetch before parsing
        => promise.all before first execution.
        => Last-Modified and If-Modified-Since
        => import map with modifications dates and URL.

    -> isinstance() / len() / divmod()
    -> type()
        { __class__ } / cstr / typeof => {__name__: "int"}
        -> write_value() => _r_.int 
        -> requires placeholders for types...
    => rewrite isinstance => typeof a === b // a instanceof b
    => [instanceof might cause issues]

    => other builtin (list/tuple/dict/set/bytes)
        -> listes en comprehensions ?
    => classes

    => f-string/format

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
    => improve fct args
        => + deduce params of JS fct from toString() [?]

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

## Links

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

    - [ ] py code in core_modules ? => pre-transpile
        - [ ] JS code insert

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

        - [ ] Build + usage
        - [ ] Generated JS: op(1n, '+', 1n) => need to override operators, can't know type of variables at transpilation type. In vanilla JS would simply write 1n + 1n / array[x] / - 2, etc // types hint
        - [ ] Context.options
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

- [ ] Python code parsing to produce AST.
- [ ] Documentation (style+markdown+complete)
- [ ] Better editor :
    - [ ] Twice exec, one with runtime type checks
    - [ ] scroll to
- [ ] Type
    - [ ] Better type deduction: if type === => change local type in body.
    - [ ] Deduce for in target type...
    - [ ] Generate TS code mode
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

## Misc


Info (TODO)
    - [ ] assert if variable is dict: ({}).__proto__ === Object.prototype or undefined
    - [ ] assert if class :  => toString starts with class
        => return Object.getOwnPropertyDescriptors(obj)?.prototype?.writable === false;
            https://stackoverflow.com/questions/526559/testing-if-something-is-a-class-in-javascript

Info
    - [ ] Arg parsing: https://github.com/brython-dev/brython/issues/2478

Simple, Speedy, Static, Small