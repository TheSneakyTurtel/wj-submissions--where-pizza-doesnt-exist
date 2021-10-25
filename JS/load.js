// This is the JavaScript file that is loaded before the HTML is parsed, and is responsible for what to show before and after the website loads

let loadingScreen, interactionScreen, contentWrapper;

const showInteractionScreen = () => {
	loadingScreen.style.display = "none";
	contentWrapper.style.display = "none";
	interactionScreen.style.display = null;
};

const showContent = () => {
	loadingScreen.style.display = "none";
	contentWrapper.style.display = null;
	interactionScreen.style.display = "none";
};

addEventListener("load", () => {
	// initialize everything
	loadingScreen = document.querySelector("loading-screen");
	interactionScreen = document.querySelector("interaction-screen");
	contentWrapper = document.querySelector("content-wrapper");

	showInteractionScreen();

	const onInteract = event => {
		// remove both event listeners that could call this function
		removeEventListener("keypress", onInteract);
		removeEventListener("click", onInteract);

		dispatchEvent(new CustomEvent("interact", { detail: event }));

		showContent();
	};

	addEventListener("keypress", onInteract);
	addEventListener("click", onInteract);
});
