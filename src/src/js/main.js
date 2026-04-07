document.querySelector("body").addEventListener("contextmenu", (e) => { e.preventDefault() });

var default_numeric = false;
var significants = 8;

const inline_shortcuts = {
	"pi": {value:"\\pi", after:undefined},
	"ii": {value:"\\imaginaryI", after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text"},
	"jj": {value:"\\imaginaryJ", after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text"},
	"ee": {value:"\\exponentialE", after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text"},
	"dd": {value:"\\differentialD", after:"nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text"},
	"oo": {value:"\\infty", after:"nothing+digit+frac+surd+binop+relop+punct+array+openfence+closefence+space"},
	"inf": {value:"\\infty", after:undefined},
	"\u221E": {value:"\\infty", after:undefined},
	"\u2211": {value:"\\sum", after:undefined},
	"sum": {value:"\\operatorname*{\\sum_{k=0}^{#?}(}#?)", after:undefined},
	"int": {value:"\\operatorname*{\\int_{#?}^{#?}(}#?\\differentialD#?)", after:undefined},
	"intbl": {value:"\\operatorname*{\\int(}#?\\differentialD#?)", after:undefined},
	"intblx": {value:"\\operatorname*{\\int(}#?\\differentialD x)", after:undefined},
	"der": {value:"\\frac{\\differentialD}{\\differentialD #?}(#0)", after:undefined},
	"derx": {value:"\\frac{\\differentialD}{\\differentialD x}(#0)", after:undefined},
	"prod": {value:"\\operatorname*{\\prod_{k=1}^{#?}(}#?)", after:undefined},
	"sqrt": {value:"\\sqrt{#?}", after:undefined},
	"cbrt": {value:"\\sqrt[3]{#?}", after:undefined},
	"root": {value:"\\sqrt[#?]{#?}", after:undefined},
	"sin": {value:"\\operatorname{sin(}#?)", after:undefined},
	"cos": {value:"\\operatorname{cos(}#?)", after:undefined},
	"tan": {value:"\\operatorname{tan(}#?)", after:undefined},
	"cot": {value:"\\operatorname{cot(}#?)", after:undefined},
	"csc": {value:"\\operatorname{csc(}#?)", after:undefined},
	"sec": {value:"\\operatorname{sec(}#?)", after:undefined},
	"arcsin": {value:"\\operatorname{arcsin(}#?)", after:undefined},
	"arccos": {value:"\\operatorname{arccos(}#?)", after:undefined},
	"arctan": {value:"\\operatorname{arctan(}#?)", after:undefined},
	"arccot": {value:"\\operatorname{arccot(}#?)", after:undefined},
	"arccsc": {value:"\\operatorname{arccsc(}#?)", after:undefined},
	"arcsec": {value:"\\operatorname{arcsec(}#?)", after:undefined},
	"sinh": {value:"\\operatorname{sinh(}#?)", after:undefined},
	"cosh": {value:"\\operatorname{cosh(}#?)", after:undefined},
	"tanh": {value:"\\operatorname{tanh(}#?)", after:undefined},
	"coth": {value:"\\operatorname{coth(}#?)", after:undefined},
	"csch": {value:"\\operatorname{csch(}#?)", after:undefined},
	"sech": {value:"\\operatorname{sech(}#?)", after:undefined},
	"arsinh": {value:"\\operatorname{arsinh(}#?)", after:undefined},
	"arcosh": {value:"\\operatorname{arcosh(}#?)", after:undefined},
	"artanh": {value:"\\operatorname{artanh(}#?)", after:undefined},
	"arcoth": {value:"\\operatorname{arcoth(}#?)", after:undefined},
	"arcsch": {value:"\\operatorname{arcsch(}#?)", after:undefined},
	"arsech": {value:"\\operatorname{arsech(}#?)", after:undefined},
	"lb": {value:"\\log_{2}(#?)", after:undefined},
	"lg": {value:"\\operatorname{lg(}#?)", after:undefined},
	"log": {value:"\\log_{#?}(#?)", after:undefined},
	"ln": {value:"\\operatorname{ln(}#?)", after:undefined},
	"lim": {value:"\\lim_{#?\\to#?}(#?)", after:undefined},
	"\u2260": {value:"\\ne", after:undefined},
	"!=": {value:"\\ne", after:undefined},
	"*": {value:"\\cdot", after:undefined},
	"Ans": {value:"\\operatorname{Ans}", after:undefined},
	"ans": {value:"\\operatorname{Ans}", after:undefined},
};

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