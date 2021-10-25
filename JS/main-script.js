// This is the JavaScript file that manages the website's content, but in reality it just initializes all of the other stuff

import initializeParticles from "./particles-manager.js";
import GlobalPreferences from './global-preferences.js';
import updateLavaAnimations from './lava-animations.js';
import initializeBGMusic from './bg-music.js';

addEventListener("interact", () => {
	if ((GlobalPreferences.BGMusic.value ?? GlobalPreferences.BGMusic.default) === true) initializeBGMusic(GlobalPreferences.equalizer.value ?? GlobalPreferences.equalizer.default);
	if ((GlobalPreferences.particleAnimations.value ?? GlobalPreferences.particleAnimations.default) === true) initializeParticles();
	if ((GlobalPreferences.lavaAnimations.value ?? GlobalPreferences.lavaAnimations.default) === true) requestAnimationFrame(updateLavaAnimations);
});
