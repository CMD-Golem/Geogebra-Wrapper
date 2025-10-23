var geogebra_approximate_result = false;

// translation function
function geogebraStartCalc() {
	var selected_field = document.getElementsByClassName("activeMath")[0];
	var plain_input = selected_field.getValue("plain-text");

	// translation
	geog_input = plain_input;

	// Get Nummric result
	if (geogebra_approximate_result) geog_input = `Numeric(${geog_input})`;

	// get geogebra response
	var geog_label = ggbApplet.evalCommandGetLabels(geog_input);
	var latex = ggbApplet.getLaTeXString(geog_label);

	selected_field.executeCommand(["insert", latex, {insertionMode:"replaceAll"}]);

	// show result
	if (selected_field.getAttribute("data-show") == null) return;

	// show in graph
	ggbApplet.setColor(geog_label, 255,0,0);
	ggbApplet.setVisible(geog_label, true);
	
	// get new label
	var stored_label = selected_field.getAttribute("data-label");
	if (stored_label == null) {
		selected_field.setAttribute("data-label", geog_label);
		stored_label = geog_label;
	}
	// delete old label and rename
	else {
		ggbApplet.deleteObject(geog_label);
		var success = ggbApplet.renameObject(geog_label, stored_label); // returns bool of success
		console.log(success);
	}
}






// ###################################################
// change geogebra grid
function setAxisSteps(steps) {
	if (steps == "xpi") ggbApplet.setAxisSteps(1, "pi", 0);
	else if (steps == "ypi") ggbApplet.setAxisSteps(1, 0, "pi");
	else if (steps == "xpi2") ggbApplet.setAxisSteps(1, "pi/2", 0);
	else if (steps == "ypi2") ggbApplet.setAxisSteps(1, 0, "pi/2");
	else ggbApplet.setAxisSteps(1, 0, 0);
}

function setColor(el, color) {
	ggbApplet.setColor(el.getAttribute("data-label"), color[0], color[1], color[2]);
}

function setVisibility(el, state) {
	ggbApplet.setVisible(el.getAttribute("data-label"), state);
}

// ###################################################
// init
var ggbApplet;

async function loadGeogebra() {
	var response = await fetch("src/ggb_base64.ggb");
	var arrayBuffer = await response.arrayBuffer();

	var binary = new Uint8Array(arrayBuffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
	var base64 = btoa(binary);

	ggbApplet = new GGBApplet({
		appName: "cas",
		width: 800,
		height: 800,
		editorBackgroundColor: "rgb(31,33,35)",
		editorForegroundColor: "rgb(200,195,188)",
		borderColor: "",
		showKeyboardOnFocus: false,
		ggbBase64: base64
	}, true);

	ggbApplet.setHTML5Codebase('src/geogebra/HTML5/5.0/web3d/');
	ggbApplet.inject("ggb-element");
}

loadGeogebra()