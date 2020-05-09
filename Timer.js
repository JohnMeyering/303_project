class Timer extends Font {
	constructor() {
		//constructor(text, font, font_size, color, x, y)
		super("0", "Arial", "24px", "white", 960, 30);
	}

	tick(time) {
		this.text = "" + time;
		this.update();
	}
}