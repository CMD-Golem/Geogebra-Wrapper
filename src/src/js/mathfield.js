// create first math-field
var mathlist = document.querySelector("math-list");
var math_id_counter = 0;

function addMathLine() {
	mathlist.blur();
	var box = document.createElement("math-box");
	box.id = math_id_counter;
	math_id_counter++;
	mathlist.appendChild(box);

	var input = document.createElement("math-field");
	input.classList.add("math_input");
	input.addEventListener("focus", () => { box.classList.add("activeMath") });
	input.addEventListener("blur", () => { box.classList.remove("activeMath") });
	input.addEventListener("input", geogebraStartCalc);
	box.appendChild(input);
	input.focus();
	input.menuItems = [];
	input.mathVirtualKeyboardPolicy = "manuall";

	var output = document.createElement("math-field");
	output.classList.add("math_output");
	output.setAttribute("readonly", true);
	box.appendChild(output);
}



// init
MathfieldElement.soundsDirectory = null;
MathLive.renderMathInDocument();
addMathLine();

// load keyboard latex

// keyboard functions
function insertMath(math, insertion_mode) {
	var math_box = document.querySelector(".activeMath");
	if (insertion_mode == undefined) insertion_mode = "replaceSelection";
	if (math_box == undefined) return console.log("Nothing selected");

	var selected_field = math_box.children[0];
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
	var selected_field = document.querySelector(".activeMath").children[0];
	move_math_timer = setTimeout(moveMath, 150, action);

	if (action == "forward") selected_field.executeCommand("moveToNextChar");
	else if (action == "backwards") selected_field.executeCommand("moveToPreviousChar");
	else if (action == "delete") selected_field.executeCommand("deleteBackward");
}

// overwrite default keybindings and inline shortcuts:
// mathlive.min.js: var um and var Ba

