export default class FunctionUtils {

	static isTouch() {
		return window.ontouchstart === null && window.ontouchmove === null && window.ontouchend === null;
	}

	static getCoverSizeImage(picWidth, picHeight, containerWidth, containerHeight) {
		let pw = picWidth;
		let ph = picHeight;
		let cw = containerWidth || Stage.width;
		let ch = containerHeight || Stage.height;
		let pr = pw / ph;
		let cr = cw / ch;

		if (cr < pr) {
			return {
				'width': ch * pr,
				'height': ch,
				'top': 0,
				'left': - ((ch * pr) - cw) * 0.5
			}
		} else {
			return {
				'width': cw,
				'height': cw / pr,
				'top': - ((cw / pr) - ch) * 0.5,
				'left': 0
			}
		}
	}

	static hashString (str){
		var hash = 0;
		if (str.length == 0) {
			return hash;
		}
		for (let i = 0; i < str.length; i++) {
			let char = str.charCodeAt(i);
			hash = (( hash << 5 ) - hash ) + char;
			hash = hash & hash;
		}
		return hash;
	}

	static rand(min, max) {
		return lerp(Math.random(), min, max);
	}

	static lerp(ratio, start, end) {
		return start + (end - start) * ratio;
	}

	static toDegrees(rad) {
		return rad * (180 / Math.PI);
	}

	static toRadians(deg) {
		return deg * (Math.PI / 180);
	}

	static findDistance(p1, p2) {
		var dx = p2.x - p1.x;
		var dy = p2.y - p1.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	static randomColor() {
		var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
		if (color.length < 7) {
			color = this.randomColor();
		}
		return color;
	}

	static clamp() {
		return Math.min(Math.max(num, min), max);
	}

	static constrain() {
		return Math.min(Math.max(num, Math.min(min, max)), Math.max(min, max));
	}

	static mix(from, to, alpha) {
		return from * (1 - alpha) + to * alpha;
	}

	static smoothstep(min, max, value) {
		var x = Math.max(0, Math.min(1, (value - min) / (max - min)));
        return x * x * (3 - 2 * x);
	}

	static hitTestObject(obj1, obj2) {
		var x1 = obj1.x
			, y1 = obj1.y
			, w = obj1.width
			, h = obj1.height;
		var xp1 = obj2.x
			, yp1 = obj2.y
			, wp = obj2.width
			, hp = obj2.height;
		var x2 = x1 + w
			, y2 = y1 + h
			, xp2 = xp1 + wp
			, yp2 = yp1 + hp;
		if (xp1 >= x1 && xp1 <= x2) {
			if (yp1 >= y1 && yp1 <= y2) {
				return true;
			} else {
				if (y1 >= yp1 && y1 <= yp2) {
					return true;
				}
			}
		} else {
			if (x1 >= xp1 && x1 <= xp2) {
				if (yp1 >= y1 && yp1 <= y2) {
					return true;
				} else {
					if (y1 >= yp1 && y1 <= yp2) {
						return true;
					}
				}
			}
		}
		return false;
	}

}
