  class Font {

	constructor(text, font, font_size, color, x, y) {
		this.text = text;
		this.font = font;
		this.font_size = font_size;
		this.color = color;
		this.x = x;
		this.y = y;
	}

	update() {
		var ctx = Game.context;
		ctx.font = this.font_size + " " + this.font;
		ctx.fillStyle = this.color;
		ctx.fillText(this.text, this.x, this.y);
	}
}