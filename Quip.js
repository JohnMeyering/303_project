class Quip extends ImageNew {
	constructor(quipNumber) {
		//constructor(width, height, color, x, y, type, flipCheck)
		if(quipNumber == 1) {
			super(500, 350, "images/speech_bubble_transparent.png", 20, 300, "image", "flip");
		}
		else if(quipNumber == 2) {
			super(500, 350, "images/speech_bubble_transparent.png", 510, 300, "image", "no flip");
		}

		this.text = `Poop Poop Poop Poop Poop Poop Poop Poop Poop Poop Poop Poop Poop`;
		this.font = "Times New Roman";

		this.font_obj1;
		this.font_obj2;

		//if the text is longer than 30 characters, cut it in two
		//constructor(text, font, font_size, color, x, y)
		if(this.text.length > 30) {
			let first_half = this.text.substring(0, 31);
			let second_half = this.text.substring(31, this.text.length);

			this.font_obj1 = new Font(first_half, this.font, "22px", "black", this.x + 70, this.y + 70);
			this.font_obj2 = new Font(second_half, this.font, "22px", "black", this.x + 62, this.y + 94);
		}
		else {
			//text will all fit on one line
			this.font_obj1 = new Font(this.text, this.font, "22px", "black", this.x + 70, this.y + 70);
			this.font_obj2 = new Font("", this.font, "22px", "black", this.x + 62, this.y + 94);
		}
	}

	setFontObj(text, font) {
		this.text = text;
		this.font = font;

		//if the text is longer than 30 characters, cut it in two
		//constructor(text, font, font_size, color, x, y)
		if(this.text.length > 30) {
			let first_half = this.text.substring(0, 31);
			let second_half = this.text.substring(31, this.text.length);

			this.font_obj1 = new Font(first_half, this.font, "22px", "black", this.x + 70, this.y + 70);
			this.font_obj2 = new Font(second_half, this.font, "22px", "black", this.x + 62, this.y + 94);
		}
		else {
			//text will all fit on one line
			this.font_obj1 = new Font(this.text, this.font, "22px", "black", this.x + 70, this.y + 70);
			this.font_obj2 = new Font("", this.font, "22px", "black", this.x + 62, this.y + 94);
		}
	}

	displayQuip() {
		this.update();
		this.font_obj1.update();
		this.font_obj2.update();
	}
}