# SimplerBrython

## Status

Mean speed gain : -23.43% (runtime -40.75%, py2js -14.14%).
Mean file size gain : -84.62%
Unit tests : 95/1911 (1816 excluded)

https://denis-migdal.github.io/SimplerBrython/tools/Editor/index.html?test=all
https://denis-migdal.github.io/SimplerBrython/tools/Editor/index.html?test=brython
(disable privacy.reduceTimerPrecision on FF for better precision)


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

#### Some core refactor (osef)

Bugs
    -> bug : code gen vs print code include ";" aux lignes... 
        -> une fonction exportée

Refactor
    -> body/newline/args (toJS...)

#### Operators

    // stats : = instead of +=...
    // + cmp results...
    // assert equals => gives the wrong result = better

    //...

    //TODO: bug unary priority...

    //TODO: add other JSBinop
    //TODO: add for other types
    //TODO: redo cmp op and unary op ?

    (2) Affectation system (auto-generate operators)
        => addDefaultOperator()
                -> /!\ cmp op. (==)/(===) -> return true [int convert?]
                -> /!\ unary op (?) [keep like that for now ?]
            => //= (?)
            => // iadd / imul / ixxx operators !!!
        => default += (=> = (a+b)) (can't do += by default)
            => /!\ += repeat a.
    (0) -> canBeFloat() on ASTNode + on operators + requestOptiInt(true/false) [or whatever ?]
    (1) Compare int/float/bool -> requestOptiInt / int2Float() (internally request).
    (3) constructors
    (4) type() / isinstance()
    (5) other types

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

    (1) Compare operators
        (2) canRepeat ? (symbol + literals + 'simple ops on literal/symbol' (not implement ?) ).
        (3) temporary variable (+ clean-up: (t=null, x) ).
            [N=2, N=3]

    (5) type() [fake py class] / isinstance()
        - mro (+ __isinstance__ / __class__) ?
        https://docs.python.org/3/library/functions.html
    (*) fct call/signatures... (! many call signatures !)
    (*) tuple/dict/list/set/etc.
    (*) classes
    (*) Brython interactions.

-> asFloat => (>> & ^ | ~) ? => BigInt(asFloat(a) & asFloat(b) ).
    => operators.canBeFloat()
        => Node.canBeFloat()
            => if Int2Float() and canBeFloat() => enforce float.
-> other operators...
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
- Replace ASTNode by a struct (when introduced in JS) / avoid allocations.

## Currently Working on...

-> operators+other keywords.
-> fct calls more complex.
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
    
    4. Refactors
        - ASTNode type refactor
        - join([Array], ", ") => handle in toJS
        - nl(indent_src, 1)   => handle in toJS
        - body()              => handle in toJS
        - toJS += : only "+".

    5. clean doc/README...
    6. Brython unit test
        - assert keyword
        - tester module
        -> editor switch test suite... + store test suite.
            -> new SBrython().
    7. AST Tree checks

    8. ADD other features... (keywords/ops...)

### ASTNode type refactor

    - ifblock => split files.
    - =(assign) variant (how to remove ?)
    - remove type from constructor, set it depending on the filename ?
    - make a typeof for type ? so that it isn't string ?

### SBrython AST

- Webworker to distribute work ?
    -> WEBASM to control allocations ?
    -> ?
- Type checker/setter after AST build.
-> toJS => lors du convert node...


- associer gauche ou droite ?

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

### Complex fct params

Cf https://github.com/brython-dev/brython/issues/2478

- Python function
    - (...pos_only & pos_no_defaults)
        - [add if only one default].
        - [add if default is None... (null)]
    - ({...pos_with_defaults, ...kw_args, kwargs})
        - if only kwargs => {} directly...
    - (...vargs)
- call with kw args.

- fake for JS (later) -> get params names.
- assert how to use it from JS.toString() [needs to be known at transcript time...]
    => import => local variable => type + "ref" (if known at transcript time) => operator.??? => now we have the JS fct...
    +> plug [native code fcts...]

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
        - continue+break;
        - async/await
        + move some 2 keywords.
    - ops
        a. unary -/+
        b. cmp : > >= < <= !=
        c. or / and / not

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
    - disable cache
    cf https://github.com/brython-dev/brython/blob/master/www/src/py2js.js

- [ ] traceback... (+ need compat mode for locals)

- [ ] convert body into full core_module ? idem for fct args ?

- [ ] SBrython
    - [ ] doc API + complete API
    - [ ] stack conversion inside it ?

## Misc

Bugs (Brython)
    - [ ] https://github.com/brython-dev/brython/issues/2479

Info (TODO)
    - [ ] assert if variable is dict: ({}).__proto__ === Object.prototype or undefined
    - [ ] assert if class :  => toString starts with class
        => return Object.getOwnPropertyDescriptors(obj)?.prototype?.writable === false;
            https://stackoverflow.com/questions/526559/testing-if-something-is-a-class-in-javascript

Info
    - [ ] Arg parsing: https://github.com/brython-dev/brython/issues/2478