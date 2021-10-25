// This is the JavaScript file that stores particle configurations, and uses them

const particleConfigs = {
    "template": {
        "particles": {
            "number": { "value": 14 },
            "color": { "value": "#e23132" },
            "opacity": { "value": 0.4, "random": true, "anim": { "speed": 1.421, "opacity_min": 0.1 } },
            "size": { "value": 6, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 3, "sync": false } },
            "line_linked": { "enable": false, "distance": 0, "color": "#000", "opacity": 0, "width": 0 },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "top",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": { "enable": true, "rotateX": 320, "rotateY": 1842 }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": false, "mode": "" },
                "onclick": { "enable": false, "mode": "" },
                "resize": true
            }
        },
        "retina_detect": false
    },
    "lavaTemplateOverrides": {
        "particles": {
            "number": { "value": 43 },
            "color": { "value": "#99292a" },
            "opacity": { "value": 0.45, "anim": { "speed": 2.21, "opacity_min": 0.2 } },
            "size": { "value": 8 },
            "move": { "speed": 2 }
        }
    }
}

const particles = [{ id: "lava-particles", templateOverrideName: "lavaTemplateOverrides" }];

const initializeParticles = () => {
	particles.forEach(particle => particlesJS(particle.id, Object.assign(particleConfigs[particle.templateOverrideName], particleConfigs.template)));

	// particlesJS doesn't show any particle until the resize event is triggered, so here's a way to get around this
	requestAnimationFrame(() => dispatchEvent(new Event("resize")));
};

export default initializeParticles;