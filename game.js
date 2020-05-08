function startGame() {
    Game.start();
}

var Game = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.id = "game";
        this.canvas.width = 1024;
        this.canvas.height = 768;
        this.context = this.canvas.getContext("2d");
        $("#content").append(this.canvas);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20); //leaderboard updates every 5 seconds
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}
function updateGameArea() {
    //clear the last frame
    Game.clear();

    if(players.length != 4) {
        //just display the players that we have
        displayPlayers();
    }

}

function displayPlayers() {
    for(let i=0; i < players.length; ++i) {
        players[i].update();
    }
}