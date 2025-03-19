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
		editorBackgroundColor: "#fff",
		editorForegroundColor: "#000",
		detachKeyboard: true,
		showAlgebraInput: true,
		borderColor: "",
		ggbBase64: base64
	}, true);

	// ggbApplet.setHTML5Codebase('src/geogebra/HTML5/5.0/web3d/');
	ggbApplet.inject("ggb-element");
}

load()





