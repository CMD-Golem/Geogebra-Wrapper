document.querySelector("body").addEventListener("contextmenu", (e) => { e.preventDefault() });

var default_numeric = false;
var significants = 8;

var math_data = [
	{input:"pi", value:"\\pi", search:null, after:undefined},
	{input:"ii", value:"\\imaginaryI", search:"i", regex:"(?<![A-Za-z])i(?![A-Za-z])", replace:"\u03af", after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text"},
	{input:"jj", value:"\\imaginaryJ", search:"j", regex:"(?<![A-Za-z])j(?![A-Za-z])", replace:"\u03af", after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text"},
	{input:"ee", value:"\\exponentialE", search:"e", regex:"(?<![A-Za-z])e(?![A-Za-z])", replace:"\u212f", after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text"},
	{input:"dd", value:"\\differentialD", search:null, after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text"},
	{input:"oo", value:"\\infty", search:"oo", regex:"(?<![A-Za-z])oo(?![A-Za-z])", replace:"\u221E", after:"nothing+digit+frac+surd+binop+relop+punct+array+openfence+closefence+space"},
	{input:"inf", value:"\\infty", search:null, after:undefined},
	{input:"\u221E", value:"\\infty", search:null, after:undefined},
	{input:"\u2211", value:"\\sum", search:"sum", regex:"sum", replace:sum, after:undefined},
	{input:"sum", value:"\\sum_{k=0}^{#?}(#?)", search:null, after:undefined},
	{input:"int", value:"\\int_{#?}^{#?}(#?\\differentialD#?)", search:"int", regex:"int", replace:int, after:undefined},
	{input:"prod", value:"\\prod_{k=1}^{#?}(#?)", search:"prod", regex:"prod", replace:prod, after:undefined},
	{input:"sqrt", value:"\\sqrt{#?}", search:null, after:undefined},
	{input:"cbrt", value:"\\sqrt[3]{#?}", search:null, after:undefined},
	{input:"root", value:"\\sqrt[#?]{#?}", search:"root", regex:"root", replace:nroot, after:undefined},
	{input:"sin", value:"\\operatorname{sin(}#?)", search:null, after:undefined},
	{input:"cos", value:"\\operatorname{cos(}#?)", search:null, after:undefined},
	{input:"tan", value:"\\operatorname{tan(}#?)", search:null, after:undefined},
	{input:"cot", value:"\\operatorname{cot(}#?)", search:null, after:undefined},
	{input:"csc", value:"\\operatorname{csc(}#?)", search:null, after:undefined},
	{input:"sec", value:"\\operatorname{sec(}#?)", search:null, after:undefined},
	{input:"arcsin", value:"\\operatorname{arcsin(}#?)", search:null, after:undefined},
	{input:"arccos", value:"\\operatorname{arccos(}#?)", search:null, after:undefined},
	{input:"arctan", value:"\\operatorname{arctan(}#?)", search:null, after:undefined},
	{input:"arccot", value:"\\operatorname{arccot(}#?)", search:null, after:undefined},
	{input:"arccsc", value:"\\operatorname{arccsc(}#?)", search:null, after:undefined},
	{input:"arcsec", value:"\\operatorname{arcsec(}#?)", search:null, after:undefined},
	{input:"sinh", value:"\\operatorname{sinh(}#?)", search:null, after:undefined},
	{input:"cosh", value:"\\operatorname{cosh(}#?)", search:null, after:undefined},
	{input:"tanh", value:"\\operatorname{tanh(}#?)", search:null, after:undefined},
	{input:"coth", value:"\\operatorname{coth(}#?)", search:null, after:undefined},
	{input:"csch", value:"\\operatorname{csch(}#?)", search:null, after:undefined},
	{input:"sech", value:"\\operatorname{sech(}#?)", search:null, after:undefined},
	{input:"arsinh", value:"\\operatorname{arsinh(}#?)", search:null, after:undefined},
	{input:"arcosh", value:"\\operatorname{arcosh(}#?)", search:null, after:undefined},
	{input:"artanh", value:"\\operatorname{artanh(}#?)", search:null, after:undefined},
	{input:"arcoth", value:"\\operatorname{arcoth(}#?)", search:null, after:undefined},
	{input:"arcsch", value:"\\operatorname{arcsch(}#?)", search:null, after:undefined},
	{input:"arsech", value:"\\operatorname{arsech(}#?)", search:null, after:undefined},
	{input:"lg", value:"\\operatorname{lg(}#?)", search:null, after:undefined},
	{input:"log", value:"\\log_{#?}(#?)", search:null, after:undefined},
	{input:"ln", value:"\\operatorname{ln(}#?)", search:null, after:undefined},
	{input:"lim", value:"\\lim_{#?\\to#?}(#?)", search:null, after:undefined},
	{input:"\u2260", value:"\\ne", search:null, after:undefined},
	{input:"!=", value:"\\ne", search:null, after:undefined},
	{input:"*", value:"\\cdot", search:null, after:undefined},
	{input:"Ans", value:"\\operatorname{Ans}", search:"Ans", regex:"Ans", replace:ans, after:undefined},
	{input:"ans", value:"\\operatorname{Ans}", search:null, after:undefined},
];

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
	translation_regex += math_data[i].regex + "|";
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
];

const keepMenuItems = ["add-row-above", "add-row-below", "add-column-before", "add-column-after", "delete-row", "delete-column", "insert-matrix", "cut", "paste", "select-all"]

function shortenMenuItems(field) {
	var new_menu = [];
	for (var i = 0; i < field.menuItems.length; i++) {
		var item = field.menuItems[i]
		if (keepMenuItems.includes(item.id)) {
			new_menu.push(item);
			if (item.id == "add-column-after" || item.id == "insert-matrix") {
				new_menu.push({type:"divider"});
			}
		}
		else if (item.id == "copy") {
			new_menu.push({
				id: "copy-ascii-math",
				label: MathfieldElement.strings[MathfieldElement.locale.slice(0, 2)]["menu.copy"],
				onMenuSelect: item.submenu[1].onMenuSelect,
				keyboardShortcut: "meta+C",
			});
		}
	}

	return new_menu;
}