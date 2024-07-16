# SimplerBrython

https://denis-migdal.github.io/SimplerBrython/
https://denis-migdal.github.io/SimplerBrython/doc
https://groups.google.com/g/brython/c/5Y4FneO3tzU/m/KnnzMS6QAAAJ

## Currently Working on...

- Editor
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

    - [ ] split files / core module
        - [ ] runtime

    - [ ] genlist + change + rename ifblock into controlflow.X
    - [ ] Editor :
        - forbid unknown except JS function call return value + JS symbol (check).
        - execute twice, one with runtime checks (/!\ ifblock)

    - [ ] CURRENT
        - doc API functions.
        - Mail : new line => when trace disabled if JS pos inside AST tree when code generated.

        0. gen list
        1. no unknown
        2. str/real
        3. +-/* **, % unary -, //,
        4. cmp : > >= < <= !=
        5. or / and / not
        6. Loops / While / For in range()
        7. def functions (pos args)
        8. List/Tuple/Dict => override JS...
            => exec method/getattr // JS new()

    - [ ] Add features
        - [ ] Types : float/str
        - [ ] Basic operators : + / * - + neg numbers
            - [ ] Check nodes operator priority (add parenthesis)
            - [ ] Check operators result_type
        - [ ] f-string

        - [ ] while
        - [ ] for in
            - [ ] range
        
        - [ ] define fct
            - [ ] Async/await

        - [ ] py code => pre-transpile
        - [ ] JS code insert

        - [ ] pass
        - [ ] Raise Exceptions + try/catch/finally
        - [ ] get/set attr
        - [ ] List/Tuple
        - [ ] dict
        - [ ] some APIs (e.g. str methods)

        - [ ] import/export (?)
        - [ ] define class+method
        - [ ] comments
    - [ ] list used core_module + extend core_module.
    - [ ] Error message : highlight code / lineno / offset/end_offset => find nearest node ?
    - genlist
    - brython perfs :
        - split Py2JS into Py2AST and AST2JS
        - disable cache
    cf https://github.com/brython-dev/brython/blob/master/www/src/py2js.js

## Implemented features

- Control flow
    - if(bool)
- Functions call
    - call(pos_arg)
- Literals
    - bool
    - int
    - None (explicit = JS null / implicit = JS undefined)
- Operators
    - =  (bool/int/None) + with annotations
    - == (bool/int/None)
- Symbols
    - JS global symbols.

## Student projects

- [ ] Python code parsing to produce AST.
- [ ] Documentation (style+markdown+complete)
- [ ] Better editor :
    - [ ] split unit tests (resume + split output)
    - [ ] AST result_type assertions
    - [ ] make some checks not performed in Brython.
    - [ ] verify output lines by lines + verify type + highlight
    - [ ] scroll to
    - [ ] highlight write/result line.
- [ ] Type
    - [ ] Better type deduction: if type === => change local type in body.
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