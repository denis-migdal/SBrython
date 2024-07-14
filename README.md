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

        - [ ] Runtime (TODO)
        - [ ] Build + usage
        - [ ] Generated JS: op(1n, '+', 1n) => need to override operators, can't know type of variables at transpilation type. In vanilla JS would simply write 1n + 1n / array[x] / - 2, etc.

    - [ ] split files / core module
        - [ ] runtime
    - [ ] unit tests
        - [ ] SBrython vs Brython exec (+exec time)
    - [ ] Write doc
    - [ ] Check nodes operator priority (add parenthesis)
    - [ ] Check operators result_type
    - [ ] Add features
        - [ ] JS variables
        - [ ] Call fct
        - [ ] if/else/elif
        - [ ] while
        - [ ] for
        - [ ] range
        - [ ] List
        - [ ] dict
        - [ ] Equals/Add/Sub/etc.
        - [ ] define fct
        - [ ] define variable
        - [ ] define class+method
        - [ ] f-string
        - [ ] None
    - [ ] Error message : highlight code / lineno / offset/end_offset => find nearest node ?
    - genlist

## Student projects

- [ ] Python code parsing to produce AST.
- [ ] Documentation (style+markdown+complete)
- [ ] Add features (complete SBrython)
- [ ] CPython/PEP compliant
    - [ ] debug = true
    - [ ] async as coroutines = true
    - [ ] enforce python type = false