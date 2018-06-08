import FunctionUtils from './FunctionUtils';

export default class Device {

	constructor() {
		this._tagDiv = null;
		this.agent = navigator.userAgent.toLowerCase();
		this.prefix = this.resolvePrefix();
		this.tablet = this.phone = false;
		this.touch = FunctionUtils.isTouch();

		this.mobile = this.touch && this.detect(['ios','iphone', 'ipad', 'windows', 'android','blackberry']);
		if (this.mobile) {
			this.tablet = Math.max(window.screen.width, window.screen.height) > 800;
			this.phone = !this.tablet;
		}

		this.desktop = !this.mobile;

		this.browser = {};
		this.browser.ie = this.detect('msie') || (this.detect('trident') && this.detect('rv:')) || (this.detect('windows') && this.detect('edge'));
		this.browser.chrome = !this.browser.ie && this.detect('chrome');
		this.browser.safari = !this.browser.ie && !this.browser.chrome && this.detect('safari');
		this.browser.firefox = this.detect('firefox');
		this.version = this.getVersion();

		this.system = {};
		this.system.retina = window.devicePixelRatio > 1;
		this.system.webworker = typeof window.Worker !== "undefined";
		this.system.offline = typeof window.applicationCache !== "undefined";
		this.system.webcam = !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
		this.system.webaudio = typeof window.AudioContext !== "undefined";
		try {
			this.system.localStorage = typeof window.localStorage !== "undefined";
		} catch (e) {
			this.system.localStorage = false;
		}

		this.styles = {};
		this.styles.filter = this.checkForTag("filter");
		this.styles.blendMode = this.checkForTag("mix-blend-mode");
		this.styles.vendor = this.prefix.unprefixed ? "" : this.prefix.js;
		this.styles.vendorTransition = this.styles.vendor.length ? this.styles.vendor + "Transition" : "transition";
		this.styles.vendorTransform = this.styles.vendor.length ? this.styles.vendor + "Transform" : "transform";
		this.tween = {};
		this.tween.transition = this.checkForTag("transition");
		this.tween.css2d = this.checkForTag("transform");
		this.tween.css3d = this.checkForTag("perspective");
		this.tween.complete = this.prefix.unprefixed ? "transitionend" : this.prefix.lowercase + "TransitionEnd";

		this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

		this.graphics = {};
		this.graphics.webgl = this.getWebgl();

		this.video = this.getSupportVideo();
		this.os = this.getOS();

	}

	getOS() {
		if(this.desktop) {
			if (this.detect("mac os"))
				return "mac";
			else if (this.detect("windows nt 6.3"))
				return "windows8.1";
			else if (this.detect("windows nt 6.2"))
				return "windows8";
			else if (this.detect("windows nt 6.1"))
				return "windows7";
			else if (this.detect("windows nt 6.0"))
				return "windowsvista";
			else if (this.detect("windows nt 5.1"))
				return "windowsxp";
			else if (this.detect("windows"))
				return "windows";
			else if (this.detect("linux"))
				return "linux";
			return "unknown";
		} else {
			if (this.detect("windows", "iemobile")) {
                return "windows"
            }
            if (this.detect(["ipad", "iphone"])) {
                return "ios"
            }
            if (this.detect(["android", "kindle"])) {
                return "android"
            }
            if (this.detect("blackberry")) {
                return "blackberry"
            }
		}
		return "unknown";
	}

	getSupportVideo() {
		var elem = document.createElement('video');
		var bool = false;
		try {
			if (bool = !!elem.canPlayType) {
				bool = new Boolean(bool);
				bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, '');
				bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, '');
				bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, '');
			}
		} catch (_error) {

		}
		return bool;
	}

	detect(array) {
		if (typeof array === "string") { array = [ array ]; }
		for (let i = 0; i < array.length; i++) {
			let v = array[i];
			if (this.agent.indexOf(v) !== -1) {
				return true;
			}
		}
		return false;
	}

	checkForTag(prop) {
		var div = this._tagDiv || document.createElement("div")
			, vendors = "Khtml ms O Moz Webkit".split(" ")
			, len = vendors.length;
		this._tagDiv = div;
		if (prop in div.style) {
			return true;
		}
		prop = prop.replace(/^[a-z]/, function(val) {
			return val.toUpperCase();
		});
		while (len--) {
			if (vendors[len] + prop in div.style) {
				return true;
			}
		}
		return false;
	}

	resolvePrefix() {
		var pre = "";
		if (!window._NODE_ && !window._GLES_) {
			var styles = window.getComputedStyle(document.documentElement, "");
			pre = (Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/) || (styles.OLink === "" && ["", "o"]))[1];
			var dom = ("WebKit|Moz|MS|O").match(new RegExp("(" + pre + ")","i"))[1]
		} else {
			pre = "webkit"
		}
		var IE = this.detect("trident");
		return {
			unprefixed: IE && !this.detect("msie 9"),
			dom: dom,
			lowercase: pre,
			css: "-" + pre + "-",
			js: (IE ? pre[0] : pre[0].toUpperCase()) + pre.substr(1)
		}
	}

	getWebgl() {
		try {
			let names = [ 'webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
			let canvas = document.createElement('canvas');

			for (let i = 0; i < names.length; i++) {
				let name = names[i];
				var gl = canvas.getContext(name);
				if (gl) { break; }
			}
			let info = gl.getExtension('WEBGL_debug_renderer_info');
			let output = {};
			if (info) {
				let gpu = info.UNMASKED_RENDERER_WEBGL;
				output.gpu = gl.getParameter(gpu).toLowerCase();
			}
			output.renderer = gl.getParameter(gl.RENDERER).toLowerCase();
			output.version = gl.getParameter(gl.VERSION).toLowerCase();
			output.glsl = gl.getParameter(gl.SHADING_LANGUAGE_VERSION).toLowerCase();
			output.extensions = gl.getSupportedExtensions();
			output.detect = function(matches) {
				for (let j = 0; j < matches.length; j++) {
					let match = matches[j];
					if (output.gpu && output.gpu.toLowerCase().indexOf(match) !== -1) {
						return true;
					}

					if (output.version && output.version.toLowerCase().indexOf(match) !== -1) {
						return true;
					}

					for (let k = 0; k < output.extensions.length; k++) {
						let extension = output.extensions[k];
						if (extension.toLowerCase().indexOf(match) !== -1) { return true; }
					}
				}
				return false;
			};

			return output;

		} catch (e) {
			return false;
		}
	}

	getVersion() {
		try {
			if (this.browser.chrome) {
				return Number(this.agent.split("chrome/")[1].split(".")[0]);
			}

			if (this.browser.firefox) {
				return Number(this.agent.split("firefox/")[1].split(".")[0]);
			}

			if (this.browser.safari) {
				var v = this.agent.match(/version\/([\.\d]+)/i);
				return parseFloat(v[1]);
			}

			if (this.browser.ie) {
				if (this.detect('msie')) {
					return Number(this.agent.split("msie ")[1].split(".")[0]);
				}

				if (this.detect('rv:')) {
					return Number(this.agent.split("rv:")[1].split(".")[0]);
				}

				return Number(this.agent.split("edge/")[1].split(".")[0]);
			}

		} catch (e) {
			return -1;
		}
	}
}
