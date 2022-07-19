let loader = document.getElementById("loader");

async function init() {
	document.body.removeAttribute("style");
	if (!window.location.search.includes("inapp")) {
		loader.removeAttribute("style");
		await new Promise((r) => setTimeout(r, 1000));
		document.getElementById("text-loader").classList.add("show");
		await new Promise((r) => setTimeout(r, 500));
		document.getElementById("rad").classList.remove("rotation");
		await new Promise((r) => setTimeout(r, 1000));
		loader.classList.add("hide");
		await new Promise((r) => setTimeout(r, 500));
	}
	loader.remove();
}
