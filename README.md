<div align="center">
  <h1>SBrython (Alpha version)</h1>

  <p>Write your own Websites and WebApps in Python.</p>
</div>

## SBrython

SBrython enables to execute Python codes in the Browser by efficiently converting them into JavaScript, TypeScript, or WASM. The conversion can either be made on the browser, or ahead of time.

SBrython perfectly integrates with existing Python and Web development tools, and enables you to easily interact with existing JavaScript/TypeScript codes/libraries, as well as with the browser APIs:

```html
<!DOCTYPE html>
<html>
    <head>
        <script type="module" src="SBrython.js" defer></script>
        <script type="text/sbrython">
            from JS import document

            document.querySelector("body")
        </script>
    </head>
</html>
```

### Conversion

SBrython offers several options to tweak the generation of JS/TS/WASM to better match your needs:
- `compat`: compatibility level with the Python standard:
   - `NONE`: generate clean and fastest JS/TS code, doesn't require a runtime library (***default***).
   - `PERF`: generate unclean and fast JS/TS code, requires a small runtime library.
   - `FULL`: fully compliant with the Python standard (**not implemented yet**).
   - `BRYTHON`: use [brython](https://github.com/brython-dev/brython), fully python-compliant, slower, JS-Python interactions more incertains, currently not compatible with other options.
- `export`:
    - `NONE`: can't import/export symbols (***default***).
    - `ES6`: produce ES6 modules (recommanded for AoT conversions).
    - `SBRY`: produce SBrython modules (recommanded for conversions in the Browser).
    - `GLOBAL` : store exported symbols in `__SBRY_LAST_EXPORTED__`.
- `mode`: for development purposes.
   - `dev`: performs some checks, keeps some debug informations (***default***).
   - `prod`: intended for production code.
   - `test`: like the `prod` mode, but asserts are kept.
- TODO: JS/TS output

⚠ SBrython is still in alpha version, lot of features aren't available yet. 

#### Browser

[TODO]

#### API

[TODO]

#### CLI

The `sbryc` command converts python files into JS, TS, or WASM files. Its usage is rather simple:
```shell
./tools/sbryc foo.py
```

Currently, this command accepts several options:
- `--compat NONE|PERF|FULL|BRYTHON`: the level of Python compliance (default: `NONE`).
- `--export NONE|ES6|SBRY|GLOBAL`: produce ES6 modules, or SBrython modules (default: `NONE`).
- `--mode   dev|prod|test`: (default: `dev`).
- `--outDir $DST_DIR`: the directory where the generated files are saved.
- `--watch`: the generated files are updated when the Python source files are modified.
- `--verbose`: print informations.
- `--help`: print the commande usage.

💡 If `-` is given instead of a file, `sbryc` reads the content of the standard input, and write the generated code in the standard output, e.g.:
```shell
$ echo "a = 1+1" | ./tools/sbryc - --compat PERF
var a = 1n+1n
```

⚠ `Deno` must be installed (cf [documentation](https://docs.deno.com/runtime/getting_started/installation/)).

⚠ On Windows, `sbryc` might require WSL.

### Autocompletion

SBrython stubs files are located in the `./stubs/` directory. Addind this folder to your `PYTHONPATH` will enable autocompletion features in your editor.

## Notes:

cf https://groups.google.com/g/brython/c/5Y4FneO3tzU/m/ftPUn9LMAAAJ
https://groups.google.com/g/brython/c/5Y4FneO3tzU/m/KnnzMS6QAAAJ

https://sbrython.migdal.ovh/Editor/?test=brython&merge=true
https://sbrython.migdal.ovh/Editor/
(disable privacy.reduceTimerPrecision on FF for better precision)