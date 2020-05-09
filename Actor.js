class Actor {

    constructor(width, height, x, y, type, flipCheck) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.velocity = 4;

           
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;

        
        this.centerX = x + (width/2);
        this.centerY = y + (height/2);
        this.flip = flipCheck;
    }

}
