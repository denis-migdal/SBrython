# SimplerBrython

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
    - =  (bool/int/None) + with annotations
    - == (bool/int/None)
    - [] (list/tuple[int])
- Symbols
    - JS global symbols.
- Keywords
    - pass
    - return (expr)
- modules 
    - export (functions) / import (already loaded) / import browser (=globalThis)

## Unit tests

- /tools/Editor/index.html?test=numbers
- /tools/Editor/index.html?test=classes

## Currently Working on...

Bugs
    -> bug : code gen vs print code include ";" aux lignes... 
        -> une fonction exportée
Refactor
    -> body/newline/args (toJS...)
    -> editor : split into files...

-> classes
    -> cstr.
    -> class type in context ?
-> operators+priority+other keywords.
-> list/tuple/dict -> subs symbols
-> fct calls more complex.
-> unit tests : 25 core features.
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

### Symb. subs

    - call()
        => [obj, method_name, args]
        => if obj_type.method_name in subs
            => if subs[...].filter()
                => new Node (Subs) / value = (args_nodes) => JS
        => subs.ts in modules... (gathers).
    => test only with append => push (one arg)

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
        x. ops priority+direction : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table
        a. +-/* **, % unary -, //,
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
    - [ ] split unit tests (resume + split output)
        - [ ] output : accordion (closed if success, open first error/fail) + highlight first error.
        - [ ] show AST/Code only for open output.
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