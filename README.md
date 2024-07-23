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
- Symbols
    - JS global symbols.
- Keywords
    - pass
    - return (expr)
- modules 
    - export (functions) / import (already loaded) / import browser (=globalThis)

## Currently Working on...

    - isClass
        => toString starts with class
        => return Object.getOwnPropertyDescriptors(obj)?.prototype?.writable === false ? true : false;
            https://stackoverflow.com/questions/526559/testing-if-something-is-a-class-in-javascript


    - f-string  (JoinedStr) [] => value (str) + FormattedValue (${}) => value (symbol)

    2. List/Tuple/Dict => override JS...
            => []
            => Object.freeze()
            => {} (object vs class???)
                // assert if object: ({}).__proto__ === Object.prototype or undefined
        => exec method
        => symbol system with substitution system [type, methodname] => fct().
            (getattr ?)

    - complex fct params.
        + from JS too...
    1. simple classes + JS classes.
        => no .new()
        => API build from extracting JS class (exclude some symbols?)
            => include/excludeList (?)

    - [ ] convert_node (~=recursive?) [if]
    3. keywords
        - continue+break;
        - async/await
        + move some 2 keywords.
    4. ops
        x. ops priority+direction : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table
        a. +-/* **, % unary -, //,
        b. cmp : > >= < <= !=
        c. or / and / not

    - [ ] Check AST
        - check function call arguments type... + return type.
        - check assignations AFTER AST is built ?
        - check result_type=unknown AFTER AST is built.
            - children of assign can be unknown.
            - fctcall can be unknown if not used.
            - if deduced, set unknown ?
        -> warning on node => show in editor ?

    - [ ] Add features
        - [ ] comments
        - [ ] Basic operators : + / * - + neg numbers
            - [ ] Check nodes operator priority (add parenthesis)
            - [ ] Check operators result_type
        - [ ] f-string
        
        - [ ] Async/await

        - [ ] py code => pre-transpile
        - [ ] JS code insert

        - [ ] get/set attr
        - [ ] List/Tuple
        - [ ] dict
        - [ ] some APIs (e.g. str methods)

        - [ ] define class+method
    - [ ] list used core_module + extend core_module.
    - brython perfs :
        - split Py2JS into Py2AST and AST2JS
        - disable cache
    cf https://github.com/brython-dev/brython/blob/master/www/src/py2js.js

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

- [ ] traceback... (+ need compat mode for locals)

- [ ] convert body into full core_module ? idem for fct args ?

- [ ] SBrython
    - [ ] doc API + complete API
    - [ ] stack conversion inside it ?

https://github.com/brython-dev/brython/issues/2478


Bugs (Brython)
    - [ ] https://github.com/brython-dev/brython/issues/2479