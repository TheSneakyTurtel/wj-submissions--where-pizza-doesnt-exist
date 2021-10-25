// This is the JavaScript file responsible for playing the bg music and managing the equalizer

// bg music global constants
const bgMusic = new Audio("Music/BG Music.mp3");

bgMusic.loop = true;
bgMusic.volume = 1;
bgMusic.load();

// equalizer bars global constants
const barMaxHeight = 200;
const barColor = "#ff6459c4";
const barGlowColor = "#ff6459";
const barGlowRadius = 5;

// helper classes
class BarSettings {
	/**
	 * @param {number} width
	 * @param {number} gap
	 * @param {number} count
	 */
	constructor(width = 8, gap = 4, count = 12) {
		this.width = width;
		this.gap = gap;
		this.count = count;
	}
}

// helper functions

/**
 * @param {() => AnalyserNode | AnalyserNode} analyserFn
 * @param {() => CanvasRenderingContext2D | CanvasRenderingContext2D} canvasContextFn
 * @param {() => number | number} canvasWidthFn
 * @param {() => number | number} canvasHeightFn
 * @param {() => BarSettings | BarSettings} barSettingsFn
 */
const updateEqualizer = (analyserFn, canvasContextFn, canvasWidthFn, canvasHeightFn, barSettingsFn) => {
	const analyser = analyserFn instanceof AnalyserNode ? analyserFn : analyserFn(),
		canvasContext = canvasContextFn instanceof CanvasRenderingContext2D ? canvasContextFn : canvasContextFn(),
		canvasWidth = typeof canvasWidthFn === "number" ? canvasWidthFn : canvasWidthFn(),
		canvasHeight = typeof canvasHeightFn === "number" ? canvasHeightFn : canvasHeightFn(),
		barSettings = typeof barSettingsFn === "function" ? barSettingsFn() : barSettingsFn;

	if (analyser == null || canvasContext == null || canvasWidth == null || canvasWidth <= 0 || canvasHeight == null || canvasHeight <= 0) return;
	if (barSettings == null) barSettings = new BarSettings(); // set barSettings to a default state if null

	const fbcArray = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbcArray); // populate fbcArray with actual frequency data

	// width & height (vital for this to work)
	canvasContext.canvas.width = canvasWidth;
	canvasContext.canvas.height = canvasHeight;

	// glow (technically shadow, but they're essentially the same :))
	canvasContext.shadowBlur = barGlowRadius;
	canvasContext.shadowColor = barGlowColor;

	canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height); // clear the canvas
	canvasContext.translate(0, canvasHeight); // move to the bottom left of the canvas

	canvasContext.fillStyle = barColor; // make sure colors are right

	// draw all of the bars
	const horizontalOffset = barSettings.gap + barSettings.width + (barSettings.width >> 1); // this is a constant for all bars, why calculate it for each one?
	for (let i = 0; i < barSettings.count; i++) {
		const barHeight = (fbcArray[i] / 256) * barMaxHeight; // calculate their height using the current frame sound frequency (i deliberately used the most technical wording)

		canvasContext.fillRect(i * horizontalOffset, -barHeight, barSettings.width, barHeight);
	}

	requestAnimationFrame(() => updateEqualizer(analyserFn, canvasContextFn, canvasWidthFn, canvasHeightFn, barSettingsFn));
};

// i figured the maths for these helper functions myself and i felt a bit proud while doing so
const optimalBarWidth = (canvasWidth, barCount, barGap) => canvasWidth / barCount - barGap;
const optimalBarGap = (canvasWidth, barCount, barWidth) => canvasWidth / barCount - barWidth;
const optimalBarCount = (canvasWidth, barGap, barWidth) => 1 / ((barGap + barWidth) / canvasWidth);

const initializeBGMusic = (equalizer = true) => {
	bgMusic.play();

	if (equalizer) {
		const audioContext = new AudioContext();
		const analyser = audioContext.createAnalyser();

		const canvasContext = document.querySelector("canvas.bg-music-equalizer").getContext("2d");
		const source = audioContext.createMediaElementSource(bgMusic);
		source.connect(analyser);
		analyser.connect(audioContext.destination);
		analyser.smoothingTimeConstant = 0.73; // the default is a bit too smooth for my liking

		const barWidth = 8;
		const barGap = 8;
		const barCount = Math.round(optimalBarCount(window.innerWidth, barGap, barWidth));
		const barSettingsFn = () => new BarSettings(window.innerWidth / barCount - barGap, barGap, barCount);
		const canvasWidthFn = () => window.innerWidth;
		const canvasHeightFn = () => parseFloat(window.getComputedStyle(canvasContext.canvas).height);

		updateEqualizer(analyser, canvasContext, canvasWidthFn, canvasHeightFn, barSettingsFn);
	}
};

export default initializeBGMusic;
