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
- Functions
    - def (pos_params) [requires annotations and at least 1 params]
    - call(pos_arg)
- Literals
    - bool
    - int
    - float (ops not tested)
    - str   (ops not tested)
    - None (explicit = JS null / implicit = JS undefined)
- Operators
    - =  (bool/int/None) + with annotations
    - == (bool/int/None)
- Symbols
    - JS global symbols.
- Keywords
    - pass
    - return (expr)

## Currently Working on...

    0. runtime.ts => run JS + others?
    0. Exception : how to runtime ?
        - _b_.[Symbols] : build...


    1. controlflows
        + continue+break;
        + move 2 keywords.

    2. simple classes + JS classes.
        => no .new()
    3. List/Tuple/Dict => override JS...
        => exec method/getattr // JS new()
        => symbol system++.
        => substitution system [type, methodname] => fct().
    4. Exceptions.
        => rethrow ?

        - raise
            - Error     => ? forbid ?
            - Exception => throw new PythonError(the exception)
        - catch
            - Error       => wrap into JSException (inherit Exception).
            - PythonError => unwrap to get the original Exception.

        => Error     = all errors
        => Exception = only python exceptions ?

        => in the raise, wrap it too.
        => in the catch, wrap all exception, with a function to get the JS version of the exception ?

        => Any <= [PyObj()] <= X

        => JS exception (inject_js to test) => requires non-Brython asserts...
            => or a function in window (for now...)
            => JSError <= "included" in Exception...
                => wrap in the catch ?
            => or a kind of a "virtual class" ?
        => Py exception => requires "Exception" class (at least)
            => requires runtime... (how to handle ?)
            => call on class = new class();

        => raise BaseException
        => try
        => except BaseException as e // all exceptions.
            => exception.args => constructor args
        => finally
        => else

    5. ops
        x. ops priority+direction : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table
        a. +-/* **, % unary -, //,
        b. cmp : > >= < <= !=
        c. or / and / not

    6. import/export.

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

        - [ ] Raise Exceptions + try/catch/finally + global try/catch ?
            - [ ] Error message : show Python stacktrace
            - /!\ Chromium stackstrace
        - [ ] get/set attr
        - [ ] List/Tuple
        - [ ] dict
        - [ ] some APIs (e.g. str methods)

        - [ ] import/export (?)
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
        - [ ] output : accordeon (closed if success, open first error/fail) + highlight first error.
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

- [ ] convert body into full core_module ? idem for fct args ?
- [ ] convert_node (~=recursive?)
- [ ] move pass/return to keywords ?