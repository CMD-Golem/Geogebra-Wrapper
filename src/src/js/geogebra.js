// change geogebra grid
function setAxisSteps(steps) {
	if (steps == "xpi") ggbApplet.setAxisSteps(1, "pi", 0);
	else if (steps == "ypi") ggbApplet.setAxisSteps(1, 0, "pi");
	else if (steps == "xpi2") ggbApplet.setAxisSteps(1, "pi/2", 0);
	else if (steps == "ypi2") ggbApplet.setAxisSteps(1, 0, "pi/2");
	else ggbApplet.setAxisSteps(1, 0, 0);
}

function setColor(obj, color) {
	ggbApplet.setColor(obj, color_r, color_g, color_b);
}

function setVisibility(obj, state) {
	ggbApplet.setVisible(obj, state);
}