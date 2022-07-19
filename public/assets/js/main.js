var debug = true;

init();

// Navigation
if (window.location.pathname == "/") {
	document.getElementById("menu-links").childNodes[1].classList.add("active");
} else {
	document.getElementById("menu-links").childNodes.forEach((elm, i) => {
		if (
			i != 0 &&
			elm.href != undefined &&
			elm.href.includes(window.location)
		) {
			elm.classList.add("active");
		}
	});
}

var menuIsOpen = false;

const $menu = document.getElementById("menu");
const $menuHam = document.getElementById("menu-ham");
const $menuCancel = document.getElementById("menu-cancel");
const $menuBackground = document.getElementById("menu-background");

$menuHam.addEventListener("click", () => toggleMenu());
$menuCancel.addEventListener("click", () => toggleMenu());
document
	.getElementById("menu-background")
	.addEventListener("click", () => toggleMenu());

async function toggleMenu() {
	menuIsOpen = !menuIsOpen;
	$menu.classList.toggle("openMenu");
	$menuHam.classList.toggle("display");
	$menuHam.classList.toggle("hide");
	$menuBackground.classList.toggle("display");
	$menuBackground.classList.toggle("hide");
	if (!menuIsOpen) await new Promise((r) => setTimeout(r, 1000));
	$menuBackground.style.display = menuIsOpen ? "block" : "none";
}

new Hammer(document.querySelector("main")).on("swipeleft", () => toggleMenu());

new Hammer($menuBackground).on("swiperight", () => toggleMenu());

//	Ripple Button
function createRipple(event) {
	const button = event.currentTarget;
	const circle = document.createElement("span");
	const diameter = Math.max(button.clientWidth, button.clientHeight);
	const radius = diameter / 2;

	circle.style.width = circle.style.height = `${diameter}px`;
	circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
	circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
	circle.classList.add("ripple");

	const ripple = button.getElementsByClassName("ripple")[0];

	if (ripple) {
		ripple.remove();
	}

	button.appendChild(circle);
}

const buttons = document.getElementsByTagName("button");
for (const button of buttons) {
	button.addEventListener("click", createRipple);
}
