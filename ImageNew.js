class ImageNew extends Actor {

    constructor(width, height, color, x, y, type, flipCheck) {
        //width, height, x, y, type, flipCheck
        super(width, height, x, y, type, flipCheck);
        console.log("Width:" + width  + " Height:" + height + " Color:" + color + " x:" + x + " y:" + y + " Type:" + type + " Flip:" + flipCheck);
        if(type == "image") {
            this.image = new Image();
            this.image.src = color;
        }
        this.color = color;
    }
    
    update() {
        let ctx = Game.context;
        ctx.save();

        if(this.type == "player") {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);

            ctx.fillStyle = "white";
            //fillRect(x, y, w, h)
            ctx.fillRect(this.x + 6, this.y + 6, this.width - 12, this.height - 12);
        }
        else {
            if (this.flip == "flip") {
                ctx.scale(-1, 1);
                ctx.drawImage(this.image, -this.x - this.width, this.y, this.width, this.height);
            }   
            else {
                //Variants available
                //void ctx.drawImage(image, dx, dy);
                //void ctx.drawImage(image, dx, dy, dWidth, dHeight);
                //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }
        }
        
        ctx.restore();
    }
}