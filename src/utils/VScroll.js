export default class VScroll {

	constructor() {
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onWheel = this.onWheel.bind(this);
		this.onScroll = this.onScroll.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);

		this.datas = [];
		this.bind();
	}

	bind() {
		window.addEventListener('mousedown', this.onMouseDown.bind(this));
		window.addEventListener('mouseup'  , this.onMouseUp.bind(this));
		window.addEventListener('mousemove', this.onMouseMove.bind(this));
		window.addEventListener('wheel'    , this.onWheel.bind(this));
		window.addEventListener('scroll'    , this.onScroll.bind(this));
		window.addEventListener('keydown', this.onKeyDown.bind(this));
		window.addEventListener('keyup'  , this.onKeyUp.bind(this));

		window.addEventListener('touchstart', this.onMouseDown.bind(this));
		window.addEventListener('touchend'  , this.onMouseUp.bind(this));
		window.addEventListener('touchmove', this.onMouseMove.bind(this));
	}

	unbind() {
		window.removeEventListener('mousedown', this.onMouseDown.bind(this));
		window.removeEventListener('mouseup'  , this.onMouseUp.bind(this));
		window.removeEventListener('mousemove', this.onMouseMove.bind(this));
		window.removeEventListener('wheel'    , this.onWheel.bind(this));
		window.removeEventListener('scroll'    , this.onScroll.bind(this));
		window.removeEventListener('keydown', this.onKeyDown.bind(this));
		window.removeEventListener('keyup'  , this.onKeyUp.bind(this));

		window.removeEventListener('touchstart', this.onMouseDown.bind(this));
		window.removeEventListener('touchend'  , this.onMouseUp.bind(this));
		window.removeEventListener('touchmove', this.onMouseMove.bind(this));
	}

	notify(e) {
		var i =  this.datas.length - 1;
		while (i >= 0) {
			var data = this.datas[i];
			data.cb({originalEvent: e});
			i--;
		}
	}

	add(cb, fps) {
		if(!fps) {
			fps = 60;
		}
		if (typeof cb !== "function") { return false; }
		var data = {cb: cb};
		this.datas.push(data);
		data.id = this.datas.length;
	}

	remove(cb) {
		var i = this.datas.length - 1;
		while (i >= 0) {
			var data = this.datas[i];
			if(data.cb == cb) {
				this.datas.splice(i, 1);
				break;
			}
			i--;
		}
	}

	onScroll(e) {
		this.notify(e);
	}

	onMouseDown(e) {
		this.notify(e);
	}

	onMouseUp(e) {
		this.notify(e);
	}

	onMouseMove(e) {
		this.notify(e);
	}

	onKeyDown(e) {
		this.notify(e);
	}

	onKeyUp(e) {
		this.notify(e);
	}

	onWheel(e) {
		this.notify(e);
	}
}
