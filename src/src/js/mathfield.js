// create first math-field
var mathbox = document.querySelector("math-box");
var math_id_counter = 0;

function addMathLine() {
	var el = document.createElement("math-field");
	el.addEventListener("focus", () => { el.classList.add("activeMath") });
	el.addEventListener("blur", () => { el.classList.remove("activeMath") });
	// el.addEventListener("input", geogebraStartCalc);
	el.id = math_id_counter;
	math_id_counter++;
	mathbox.appendChild(el);
	el.focus();
	el.menuItems = [];
	el.mathVirtualKeyboardPolicy = "manuall";
}



// init
MathfieldElement.soundsDirectory = null;
MathLive.renderMathInDocument();
addMathLine();

// load keyboard latex

// keyboard functions
function insertMath(math, insertion_mode) {
	var selected_field = document.getElementsByClassName("activeMath")[0];
	if (insertion_mode == undefined) insertion_mode = "replaceSelection";
	if (selected_field == undefined) return console.log("fail");
	selected_field.executeCommand(["insert", math, {insertionMode:insertion_mode, selectionMode:"placeholder"}]);
}

function changeKeys(layout) {
	return;
}

function enterMath() {
	addMathLine();
}

var move_math_timer;
function moveMath(action) {
	var selected_field = document.getElementsByClassName("activeMath")[0];
	move_math_timer = setTimeout(moveMath, 150, action);

	if (action == "forward") selected_field.executeCommand("moveToNextChar");
	else if (action == "backwards") selected_field.executeCommand("moveToPreviousChar");
	else if (action == "delete") selected_field.executeCommand("deleteBackward");
}

// overwrite default keybindings and inline shortcuts:
// mathlive.min.js: var um and var Ba

