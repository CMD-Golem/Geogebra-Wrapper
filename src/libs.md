# Geogebra
https://geogebra.github.io/docs/reference/en/GeoGebra_App_Parameters/<br>
https://geogebra.github.io/docs/reference/en/GeoGebra_Apps_Embedding/#_offline_and_self_hosted_solution<br>
https://geogebra.github.io/integration/example-customized-calculators.html?appName=notes&width=800&height=600&showToolBar&allowStyleBar&showZoomButtons&borderRadius=8&hn<br>

Get all used lables: ggbApplet.getAllObjectNames()
"showLogging": true,

# Katex
{\cvec{5\\3\\2}+\cvec{8\\3\\2}} -> ask ai for macro

{\int_0^t{5}}

{\lim_{x\to\infty}\bigg(\frac{5}{2}\bigg)}

# Mathfield
Tokes
- 0	Replace with selection or placeholder
- ?	Replace with placeholder

https://mathlive.io/mathfield/guides/shortcuts/<br>
https://mathlive.io/mathfield/guides/commands/<br>
https://mathlive.io/mathfield/guides/macros/<br>

Output is asciimath https://asciimath.org/

Since 0.108.0 read-only fields cant be edited anymore (most likly because of fixed issue #2476)

## Mathfield Atoms
https://github.com/arnog/mathlive/blob/master/src/core/types.ts#L224
- 'accent'
- 'array' // A group, which has children arranged in rows. Used by environments such as `matrix`, `cases`, etc...
- 'box' // A border drawn around an expression and change its background color
- 'chem' // A chemical formula (mhchem)
- 'choice' // A \\mathchoice command
- 'composition' // IME composition area
- 'delim'
- 'enclose'
- 'extensible-symbol' // Commands such as `\int`, `\sum`, etc...
- 'error' //  An unknown command, for example `\xyzy`. The text  is displayed with a wavy red underline in the editor.
- 'first' // A special, empty, atom put as the first atom in math lists in order to be able to position the caret before the first element. Aside from the caret, they display nothing.
- 'genfrac' // A generalized fraction: a numerator and denominator, separated by an optional line, and surrounded by optional fences
- 'group' // A simple group of atoms, for example from a `{...}`
- 'latex' // A raw latex atom
- 'latexgroup' // A string of raw latex atoms
- 'leftright' // Used by the `\left` and `\right` commands
- 'line' // Used by `\overline` and `\underline`
- 'macro'
- 'macro-argument'
- 'subsup' // A carrier for a superscript/subscript
- 'operator' // A function, including special functions, `\sin`
- 'overlap' // Display a symbol _over_ another
- 'overunder' // Displays an annotation above or below a symbol
- 'placeholder' // A temporary item. Placeholders are displayed as a dashed square in the editor.
- 'phantom'
- 'root' // A group, which has no parent (only one per formula)
- 'rule' // Draw a line, for the `\rule` command
- 'sizeddelim' // A delimiter that can grow
- 'space'
- 'spacing'
- 'surd' // Aka square root, nth root
- 'text' // Text mode atom;
- 'tooltip' // For `\mathtip` and `\texttip`
- 'prompt' The types below confound atom type and box type. They are all indicating a probable Atom class, but with a different boxType (inter-atom spacing)
- 'mbin' // Binary operator: `+`, `*`, etc...
- 'mclose' // Closing fence: `)`, `\rangle`, etc...
- 'minner' // Special layout cases, fraction, overlap, `\left...\right`
- 'mop' // `mop`: symbols with some space around them
- 'mopen' // Opening fence: `(`, `\langle`, etc...
- 'mord' // Ordinary symbol, e.g. `x`, `\alpha`
- 'mpunct' // Punctuation: `,`, `:`, etc...
- 'mrel'; // Relational operator: `=`, `\ne`, etc...