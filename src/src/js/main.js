// https://geogebra.github.io/docs/reference/en/GeoGebra_App_Parameters/
// "showLogging": true,


document.querySelector("body").addEventListener("contextmenu", (e) => { e.preventDefault() });

var default_numeric = false;
var significants = 8;

var math_data = [
	{input:"pi", value:"\\pi", search:null, replace:null, after:undefined},
	{input:"ii", value:"\\imaginaryI", search:null, replace:null, after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text"},
	{input:"ee", value:"\\exponentialE", search:null, replace:null, after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text"},
	{input:"dd", value:"\\differentialD", search:null, replace:null, after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text"},
	{input:"oo", value:"\\infty", search:"oo", replace:"\u221E", after:"nothing+digit+frac+surd+binop+relop+punct+array+openfence+closefence+space"},
	{input:"inf", value:"\\infty", search:null, replace:null, after:undefined},
	{input:"\u221E", value:"\\infty", search:null, replace:null, after:undefined},
	{input:"\u2211", value:"\\sum", search:"sum", replace:sum, after:undefined},
	{input:"sum", value:"\\sum_{k=0}^{#?}(#?)", search:null, replace:null, after:undefined},
	{input:"int", value:"\\int_{#?}^{#?}", search:null, replace:null, after:undefined},
	{input:"prod", value:"\\prod_{#?}^{#?}", search:null, replace:null, after:undefined},
	{input:"sqrt", value:"\\sqrt{#?}", search:null, replace:null, after:undefined},
	{input:"cbrt", value:"\\sqrt[3]{#?}", search:null, replace:null, after:undefined},
	{input:"root", value:"\\sqrt[#?]{#?}", search:null, replace:null, after:undefined},
	{input:"sin", value:"\\sin(#?)", search:null, replace:null, after:undefined},
	{input:"cos", value:"\\cos(#?)", search:null, replace:null, after:undefined},
	{input:"tan", value:"\\tan(#?)", search:null, replace:null, after:undefined},
	{input:"cot", value:"\\cot(#?)", search:null, replace:null, after:undefined},
	{input:"csc", value:"\\csc(#?)", search:null, replace:null, after:undefined},
	{input:"sec", value:"\\sec(#?)", search:null, replace:null, after:undefined},
	{input:"arcsin", value:"\\arcsin(#?)", search:null, replace:null, after:undefined},
	{input:"arccos", value:"\\arccos(#?)", search:null, replace:null, after:undefined},
	{input:"arctan", value:"\\arctan(#?)", search:null, replace:null, after:undefined},
	{input:"arccot", value:"\\operatorname{arccot}(#?)", search:null, replace:null, after:undefined},
	{input:"arccsc", value:"\\operatorname{arccsc}(#?)", search:null, replace:null, after:undefined},
	{input:"arcsec", value:"\\operatorname{arcsec}(#?)", search:null, replace:null, after:undefined},
	{input:"sinh", value:"\\sinh(#?)", search:null, replace:null, after:undefined},
	{input:"cosh", value:"\\cosh(#?)", search:null, replace:null, after:undefined},
	{input:"tanh", value:"\\tanh(#?)", search:null, replace:null, after:undefined},
	{input:"coth", value:"\\coth(#?)", search:null, replace:null, after:undefined},
	{input:"csch", value:"\\operatorname{csch}(#?)", search:null, replace:null, after:undefined},
	{input:"sech", value:"\\operatorname{sech}(#?)", search:null, replace:null, after:undefined},
	{input:"arsinh", value:"\\operatorname{arsinh}(#?)", search:null, replace:null, after:undefined},
	{input:"arcosh", value:"\\operatorname{arcosh}(#?)", search:null, replace:null, after:undefined},
	{input:"artanh", value:"\\operatorname{artanh}(#?)", search:null, replace:null, after:undefined},
	{input:"arcoth", value:"\\operatorname{arcoth}(#?)", search:null, replace:null, after:undefined},
	{input:"arcsch", value:"\\operatorname{arcsch}(#?)", search:null, replace:null, after:undefined},
	{input:"arsech", value:"\\operatorname{arsech}(#?)", search:null, replace:null, after:undefined},
	{input:"lg", value:"\\lg(#?)", search:null, replace:null, after:undefined},
	{input:"log", value:"\\log_{#?}(#?)", search:null, replace:null, after:undefined},
	{input:"ln", value:"\\ln(#?)", search:null, replace:null, after:undefined},
	{input:"lim", value:"\\lim_{#?\\to#?}(#?)", search:null, replace:null, after:undefined},
	{input:"\u2260", value:"\\ne", search:null, replace:null, after:undefined},
	{input:"!=", value:"\\ne", search:null, replace:null, after:undefined},
	{input:"*", value:"\\cdot", search:null, replace:null, after:undefined},
]

var inline_shortcuts = {};
var translation_layer = {};
var translation_regex = "";
for (let i = 0; i < math_data.length; i++) {
	// mathfield
	inline_shortcuts[math_data[i].input] = {
		after: math_data[i].after,
		value: math_data[i].value,
	};

	// translation
	let search = math_data[i].search;
	if (search == null) continue;
	translation_layer[search] = math_data[i].replace;
	translation_regex += search + "|";
}
translation_regex = translation_regex.slice(0,-1);

const keybindings = [
	{key:"left", command:"moveToPreviousChar"},
	{key:"right", command:"moveToNextChar"},
	{key:"up", command:"moveUp"},
	{key:"down", command:"moveDown"},
	{key:"shift+[ArrowLeft]", command:"extendSelectionBackward"},
	{key:"shift+[ArrowRight]", command:"extendSelectionForward"},
	{key:"shift+[ArrowUp]", command:"extendSelectionUpward"},
	{key:"shift+[ArrowDown]", command:"extendSelectionDownward"},
	{key:"[Backspace]", command:"deleteBackward"},
	{key:"alt+[Delete]", command:"deleteBackward"},
	{key:"[Delete]", command:"deleteForward"},
	{key:"alt+[Backspace]", command:"deleteForward"},
	{key:"alt+[ArrowLeft]", command:"moveToPreviousWord"},
	{key:"alt+[ArrowRight]", command:"moveToNextWord"},
	{key:"shift+alt+[ArrowLeft]", command:"extendToPreviousWord"},
	{key:"shift+alt+[ArrowRight]", command:"extendToNextWord"},
	{key:"ctrl+[ArrowLeft]", command:"moveToGroupStart"},
	{key:"ctrl+[ArrowRight]", command:"moveToGroupEnd"},
	{key:"shift+ctrl+[ArrowLeft]", command:"extendToGroupStart"},
	{key:"shift+ctrl+[ArrowRight]", command:"extendToGroupEnd"},
	{key:"[Home]", command:"moveToMathfieldStart"},
	{key:"cmd+[ArrowLeft]", command:"moveToMathfieldStart"},
	{key:"shift+[Home]", command:"extendToMathFieldStart"},
	{key:"shift+cmd+[ArrowLeft]", command:"extendToMathFieldStart"},
	{key:"[End]", command:"moveToMathfieldEnd"},
	{key:"cmd+[ArrowRight]", command:"moveToMathfieldEnd"},
	{key:"shift+[End]", command:"extendToMathFieldEnd"},
	{key:"shift+cmd+[ArrowRight]", command:"extendToMathFieldEnd"},
	{key:"[Pageup]", command:"moveToGroupStart"},
	{key:"[Pagedown]", command:"moveToGroupEnd"},
	{key:"[Tab]", command:"moveToNextGroup"},
	{key:"shift+[Tab]", command:"moveToPreviousGroup"},
	{key:"ctrl+a", ifPlatform:"!macos", command:"selectAll"},
	{key:"cmd+a", command:"selectAll"},
	{key:"[Cut]", command:"cutToClipboard"},
	{key:"[Copy]", command:"copyToClipboard"},
	{key:"[Paste]", command:"pasteFromClipboard"},
	{key:"[Clear]", command:"deleteBackward"},
	{key:"[Undo]", command:"undo"},
	{key:"[Redo]", command:"redo"},
	{key:"[EraseEof]", command:"deleteToGroupEnd"},
	{key:"ctrl+x", ifPlatform:"ios", command:"cutToClipboard"},
	{key:"cmd+x", ifPlatform:"ios", command:"cutToClipboard"},
	{key:"ctrl+c", ifPlatform:"ios", command:"copyToClipboard"},
	{key:"cmd+c", ifPlatform:"ios", command:"copyToClipboard"},
	{key:"ctrl+v", ifPlatform:"ios", command:"pasteFromClipboard"},
	{key:"cmd+v", ifPlatform:"ios", command:"pasteFromClipboard"},
	{key:"ctrl+z", ifPlatform:"!macos", command:"undo"},
	{key:"cmd+z", command:"undo"},
	{key:"ctrl+y", ifPlatform:"!macos", command:"redo"},
	{key:"shift+cmd+y", command:"redo"},
	{key:"shift+ctrl+z", ifPlatform:"!macos", command:"redo"},
	{key:"shift+cmd+z", command:"redo"},
	{key:"ctrl+b", ifPlatform:"macos", command:"moveToPreviousChar"},
	{key:"ctrl+f", ifPlatform:"macos", command:"moveToNextChar"},
	{key:"ctrl+p", ifPlatform:"macos", command:"moveUp"},
	{key:"ctrl+n", ifPlatform:"macos", command:"moveDown"},
	{key:"ctrl+a", ifPlatform:"macos", command:"moveToMathfieldStart"},
	{key:"ctrl+e", ifPlatform:"macos", command:"moveToMathfieldEnd"},
	{key:"shift+ctrl+b", ifPlatform:"macos", command:"extendSelectionBackward"},
	{key:"shift+ctrl+f", ifPlatform:"macos", command:"extendSelectionForward"},
	{key:"shift+ctrl+p", ifPlatform:"macos", command:"extendSelectionUpward"},
	{key:"shift+ctrl+n", ifPlatform:"macos", command:"extendSelectionDownward"},
	{key:"shift+ctrl+a", ifPlatform:"macos", command:"extendToMathFieldStart"},
	{key:"shift+ctrl+e", ifPlatform:"macos", command:"extendToMathFieldEnd"},
	{key:"alt+ctrl+b", ifPlatform:"macos", command:"moveToPreviousWord"},
	{key:"alt+ctrl+f", ifPlatform:"macos", command:"moveToNextWord"},
	{key:"shift+alt+ctrl+b", ifPlatform:"macos", command:"extendToPreviousWord"},
	{key:"shift+alt+ctrl+f", ifPlatform:"macos", command:"extendToNextWord"},
	{key:"ctrl+h", ifPlatform:"macos", command:"deleteBackward"},
	{key:"ctrl+d", ifPlatform:"macos", command:"deleteForward"},
	{key:"ctrl+l", ifPlatform:"macos", command:"scrollIntoView"},
	{key:"[NumpadDivide]", ifMode:"math", command:["insert", "\\frac{#@}{#?}"]},
	{key:"/", ifMode:"math", command:["insert", "\\frac{#@}{#?}"]},
	{key:"[IntlBackslash]", ifLayout:["apple.german"], ifMode:"math", command:["insert", "^"]}
]

/*

Katex:
{\cvec{5\\3\\2}+\cvec{8\\3\\2}} -> siehe chatgpt für makro

{\int_0^t{5}}

{\lim_{x\to\infty}\bigg(\frac{5}{2}\bigg)}


https://cortexjs.io/mathfield/

*/

