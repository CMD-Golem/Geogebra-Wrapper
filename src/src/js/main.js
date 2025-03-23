// https://geogebra.github.io/docs/reference/en/GeoGebra_App_Parameters/
// "showLogging": true,
var ggbApplet

async function load() {
	var response = await fetch("src/ggb_base64.ggb");
	var arrayBuffer = await response.arrayBuffer();

	var binary = new Uint8Array(arrayBuffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
	var base64 = btoa(binary);

	ggbApplet = new GGBApplet({
		appName: "classic",
		width: 800,
		height: 800,
		editorBackgroundColor: "rgb(31,33,35)",
		editorForegroundColor: "rgb(200,195,188)",
		borderColor: "",
		showKeyboardOnFocus: false,
		ggbBase64: base64
	}, true);

	// ggbApplet.setHTML5Codebase('src/geogebra/HTML5/5.0/web3d/');
	ggbApplet.inject("ggb-element");
}

load()


function calc() {
	var obj = ggbApplet.evalCommandGetLabels("Solve(0=x^2+5x-3)");
	var latex = ggbApplet.getLaTeXString(obj);
	ggbApplet.setColor(obj, 255,0,0);
	ggbApplet.setVisible(obj, true);
	return latex;

	// ggbApplet.setMode("1001")
	// ggbApplet.setMode("1002")

	
}


/*

Katex:
{\cvec{5\\3\\2}+\cvec{8\\3\\2}} -> siehe chatgpt für makro

{\int_0^t{5}}

{\lim_{x\to\infty}\bigg(\frac{5}{2}\bigg)}


https://cortexjs.io/mathfield/
$0.getValue("plain-text")
$0.executeCommand(["insert", "\\frac{#?}{2}", {insertionMode:"replaceSelection", selectionMode:"placeholder"}]);

*/