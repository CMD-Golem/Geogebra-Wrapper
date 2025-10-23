// Mobile submenu
// ###################################################
if (navigator.maxTouchPoints > 1) {
	var last_menu, last_td;
	var submenu = document.getElementsByClassName("has_submenu");

	for (var i = 0; i < submenu.length; i++) {
		submenu[i].addEventListener("touchstart", SubMenuStart);
		submenu[i].addEventListener("touchmove", SubMenuMove);
		submenu[i].addEventListener("touchend", SubMenuEnd);
	}
}

function SubMenuStart(event) {
	// Add hover class to td
	var target = event.currentTarget;

	last_td = target;
	last_menu = target.querySelector("p");

	target.classList.add("hover");
}

function SubMenuMove(event) {
	// Get p element
	var touch_event = event.changedTouches[0];
	var el_cord = document.elementFromPoint(touch_event.clientX, touch_event.clientY);

	var menu = el_cord.closest("P");
	if (el_cord.tagName == "P") menu = el_cord;

	// Remove/ Add hover class to p
	if (last_menu != undefined) {
		last_menu.classList.remove("hover");
		last_menu = undefined;
	}
	if (menu != null) {
		last_menu = menu;
		menu.classList.add("hover");
	}
}

function SubMenuEnd() {
	// Execute onclick
	if (last_menu != undefined) {
		last_menu.click();
		last_menu.classList.remove("hover");
	}

	// Remove classes
	last_td.classList.remove("hover");
	last_td.querySelector("p").classList.add("hover");
}


// Mouse Submenu
// ###################################################
if (window.matchMedia("(pointer: fine)").matches) {
	var submenu = document.getElementsByClassName("has_submenu");
	for (var i = 0; i < submenu.length; i++) {
		submenu[i].addEventListener("click", SubMenuClick);
		submenu[i].addEventListener("contextmenu", SubMenuContext);
	}
}

function SubMenuContext(event) {
	var target = event.currentTarget;
	target.classList.add("open_context");
	target.addEventListener("mouseleave", SubMenuHide);

	var submenu = target.getElementsByClassName("submenu");
	for (var i = 0; i < submenu.length; i++) {
		submenu[i].style.display = "flex";
	}
}

function SubMenuHide(target, is_element) {
	if (is_element == undefined) target = target.currentTarget;
	target.classList.remove("open_context");
	target.removeEventListener("mouseleave", SubMenuHide);

	var submenu = target.getElementsByClassName("submenu");
	for (var i = 0; i < submenu.length; i++) {
		submenu[i].style.display = "none";
	}
}

function SubMenuClick(event) {
	var target = event.currentTarget;

	if (target.classList.contains("open_context")) SubMenuHide(target, true);
	else target.querySelector("p").click();
}