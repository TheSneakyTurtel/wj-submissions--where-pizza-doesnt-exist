// This is the JavaScript file responsible for moving around the lava images

const lavaElements = [
	{ element: document.querySelector(".lava-1"), xScale: 1.01, yScale: 1.003, yOffset: 0, moveMagnitude: 1.6, transitionTime: 115, currentTime: 0 },
	{ element: document.querySelector(".lava-2"), xScale: 1.028, yScale: 1.004, yOffset: 0, moveMagnitude: 2.1, transitionTime: -180, currentTime: 0 },
	{ element: document.querySelector(".lava-3"), xScale: 1.045, yScale: 1.006, yOffset: 0, moveMagnitude: 2.6, transitionTime: 145, currentTime: 0 },
];

/**
 * @param {{ element: Element, xScale?: number, yScale?: number, yOffset?: number, moveMagnitude: number, transitionTime: number, currentTime: number, minimumDetailLevel: number }} lavaElement
 */
const updateLavaElement = lavaElement => {
	const xTranslation = Math.cos(lavaElement.currentTime) * lavaElement.moveMagnitude,
		yTranslation = Math.sin(lavaElement.currentTime) * lavaElement.moveMagnitude + lavaElement.yOffset;

	lavaElement.element.style.transform = `translate(${xTranslation}px, ${yTranslation}px) scale(${lavaElement.xScale}, ${lavaElement.yScale})`;
};

const updateLavaAnimations = time => {
	lavaElements.forEach(lavaElement => {
		lavaElement.currentTime = time / lavaElement.transitionTime;
		updateLavaElement(lavaElement);
	});

	requestAnimationFrame(updateLavaAnimations);
};

export default updateLavaAnimations;
