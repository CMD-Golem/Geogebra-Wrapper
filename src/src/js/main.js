// "showLogging": true,

const ggbApp = new GGBApplet({
	"appName": "CAS",
	"width": 800,
	"height": 800,
	"editorBackgroundColor": "#fff",
	"editorForegroundColor": "#000",
	"detachKeyboard": true,
	"showAlgebraInput": true,
	"borderColor": ""
}, true);
ggbApp.setHTML5Codebase('src/geogebra/HTML5/5.0/web3d/');

ggbApp.inject("ggb-element");