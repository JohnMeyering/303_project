class QuipPrompt extends ImageNew {
	constructor() {
		//constructor(width, height, color, x, y, type, flipCheck)
		super(800, 240, "images/block_bubble.png", 80, 5, "image", "flip");

		this.text = `Poop Poop Poop Poop Poop Poop Poop Poop Poop Poop Poop Poop Poop`;
		this.font = "Times New Roman";

		this.font_obj1;
		this.font_obj2;

		//if the text is longer than 30 characters, cut it in two
		//constructor(text, font, font_size, color, x, y)
		if(this.text.length > 40) {
			let first_half = this.text.substring(0, 40);
			let second_half = this.text.substring(40, this.text.length);

			this.font_obj1 = new Font(first_half, this.font, "36px", "black", this.x + 120, this.y + 130);
			this.font_obj2 = new Font(second_half, this.font, "36px", "black", this.x + 150, this.y + 170);
		}
		else {
			//text will all fit on one line
			this.font_obj1 = new Font(this.text, this.font, "22px", "black", this.x + 120, this.y + 130);
			this.font_obj2 = new Font("", this.font, "22px", "black", this.x + 150, this.y + 170);
		}
	}

	setFontObj(text) {
		//if the text is longer than 30 characters, cut it in two
		//constructor(text, font, font_size, color, x, y)
		this.text = text;
		if(this.text.length > 40) {
			let first_half = this.text.substring(0, 40);
			let second_half = this.text.substring(40, this.text.length);

			this.font_obj1 = new Font(first_half, this.font, "36px", "black", this.x + 120, this.y + 130);
			this.font_obj2 = new Font(second_half, this.font, "36px", "black", this.x + 150, this.y + 170);
		}
		else {
			//text will all fit on one line
			this.font_obj1 = new Font(this.text, this.font, "36px", "black", this.x + 120, this.y + 130);
			this.font_obj2 = new Font("", this.font, "36px", "black", this.x + 150, this.y + 170);
		}
	}
	display() {
		this.update();
		this.font_obj1.update();
		this.font_obj2.update();
	}
}