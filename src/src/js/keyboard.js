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
	var touch_td = event.target;
	var td = touch_td.closest(".has_submenu");
	if (touch_td.classList.contains("has_submenu")) {
		td = touch_td;
	}

	last_td = td;
	last_menu = td.querySelector("p");

	td.classList.add("hover");
}

function SubMenuMove(event) {
	// Get p element
	var touch_el = event.changedTouches[0];
	var el_cord = document.elementFromPoint(touch_el.clientX, touch_el.clientY);

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
	last_td.getElementsByTagName("p")[0].classList.add("hover");
}


// Mouse Submenu
// ###################################################
if (window.matchMedia("(pointer: fine)").matches) {
	document.querySelector("main").addEventListener('contextmenu', event => {
		event.preventDefault();

		var td_click = event.target;
		var td_menu = td_click.closest(".has_submenu");
		if (td_click.classList.contains("has_submenu")) td_menu = td_click;

		if (td_menu != null) {
			td_menu.addEventListener("click", SubMenuHide);
			td_menu.addEventListener("mouseleave", SubMenuHide);

			var submenu = td_menu.getElementsByClassName("submenu");
			for (var i = 0; i < submenu.length; i++) {
				submenu[i].style.display = "flex";
			}
		}
	});

	var submenu = document.getElementsByClassName("has_submenu");

	for (var i = 0; i < submenu.length; i++) {
		submenu[i].addEventListener("click", SubMenuClick);
	}
}

function SubMenuHide(event) {
	var td_menu = event.target.closest(".has_submenu");

	td_menu.removeEventListener("click", SubMenuHide);
	td_menu.removeEventListener("mouseleave", SubMenuHide);

	var submenu = td_menu.getElementsByClassName("submenu");
	for (var i = 0; i < submenu.length; i++) {
		submenu[i].style.display = "none";
	}
}

function SubMenuClick(event) {
	console.log(event)
	// event.target.querySelector("submenu").children[0].click();
}