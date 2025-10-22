// create first math-field
var mathbox = document.querySelector("math-box");
var math_id_counter = 0;

function addMathLine() {
	var el = document.createElement("math-field");
	el.addEventListener("focus", () => { el.classList.add(".activeMath") });
	el.addEventListener("blur", () => { el.classList.remove(".activeMath") });
	el.addEventListener("contextmenu", (e) => { e.preventDefault() });
	el.id = math_id_counter;
	math_id_counter++;
	mathbox.appendChild(el);
	el.focus();
	el.menuItems = [];
	el.mathVirtualKeyboardPolicy = "manuall";
}

addMathLine();

// disable stuff
MathfieldElement.soundsDirectory = null;

// load keyboard latex
MathLive.renderMathInDocument();

// overwrite default keybindings and inline shortcuts:
// mathlive.min.js: var um and var Ba

