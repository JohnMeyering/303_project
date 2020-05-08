class ImageNew extends Actor {

    constructor(width, height, color, x, y, type, flipCheck) {
        super(width, height, color, x, y, "image", flipCheck);

        this.image = new Image();
        this.image.src = color;
    }
    
    update() {
        let ctx = Game.context;
        ctx.save();

        if (this.flip == "flip") {
        	ctx.translate(this.x, this.y);        
            ctx.scale(-1, -1);
            ctx.drawImage(this.image, this.x, this.y, 0, 0, this.width, this.height);
        }
        else {
            //Variants available
            //void ctx.drawImage(image, dx, dy);
            //void ctx.drawImage(image, dx, dy, dWidth, dHeight);
            //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        
        ctx.restore();
    }
}