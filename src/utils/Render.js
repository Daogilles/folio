export default class Render {

	constructor() {
		this.update = this.update.bind(this);
		this.datas = [];

		// this.stats = new Stats();
		// this.stats.dom.id = "stats";
		// this.stats.showPanel(0);
		//document.body.appendChild( this.stats.dom );

		this.update();
	}

	update() {
		//this.stats.begin();

		let now = Date.now();
		let i =  this.datas.length - 1;
		while (i >= 0) {
			let data = this.datas[i];
			let delta = now - data.lastTime;
			let interval = 1000 / data.fps;
			if (delta > interval) {
				data.lastTime += interval;
				data.cb();
			}
			i--;
		}
		//this.stats.end();
		requestAnimationFrame(this.update);
	}

	add(cb, fps = 60) {
		if(cb == null || typeof cb != "function") {
			throw new Error("Invalid callback");
			return;
		}
		let data = {cb, fps, lastTime: Date.now()};
		this.datas.push(data);
		data.id = this.datas.length;
	}

	remove(cb) {
		let i = this.datas.length - 1;
		while (i >= 0) {
			let data = this.datas[i];
			if(data.cb == cb) {
				this.datas.splice(i, 1);
				break;
			}
			i--;
		}
	}
}
