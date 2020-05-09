class Player extends ImageNew {
	constructor(display_name, display_color, display_font, player_number) {
		//width, height, color, x, y, type, flipCheck
		super(200, 100, display_color, player_number*220 + 80, 600, "player", "no flip");

		this.name = display_name;
		this.font = display_font;
		this.color = display_color;
		this.player_number = player_number;
		this.score = 0;
		this.isPlaying = false;


		//constructor(width, height, x, y)
		this.star_burst = new StarBurst(400, 300, this.x-100, 500);

		//constructor(text, font, font_size, color, x, y)
		this.playerName = new Font(display_name, display_font, "16px", display_color, this.x + 30, this.y + 40);
		this.playerScore = new Font(this.score, display_font, "18px", display_color, this.x + 30, this.y + 60);
	}

	drawStarBurst() {
		this.star_burst.update();
	}
	drawPlayerName() {
		this.playerName.update();
	}
	drawPlayerScore() {
		this.playerScore.update();
	}
	incrementPlayerScore(numVotes) {
		this.score += (numVotes * 100);
		this.playerScore = new Font(this.score, this.font, "18px", this.color, this.x + 30, this.y + 60);
	}

	displayPlayer() {
		this.update();
        this.drawPlayerName();
        this.drawPlayerScore();
	}
}