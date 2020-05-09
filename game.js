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
        this.interval = setInterval(updateGameArea, 20);
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

    //For each state, when ending the state -> perform setup for the next state
    if(state == "waiting for players") {
        // Do nothing
        // testing player images
        // for(let i=0; i<4; ++i) {
        //     console.log("Creating new players");
        //     let new_color = "#" + i * 2 + "" + i*2 + "" + i*2 + "" + i*2 + "" + i*2 + "" + i*2 + "";
        //     let new_player = new Player("player " + i, new_color, "Comic Sans MS", i);
        //     players.push(new_player);
        // }
        

        if(players.length == 4) {
            console.log("Swapping to prompt quipers");
            quip_1 = new Quip(1);
            quip_2 = new Quip(2);
            quip_prompt = new QuipPrompt();
            state = "prompt quipers";
            timer = new Timer();
            current_player1 = players[0];
            current_player2 = players[1];
            current_player1.isPlaying = true;
            current_player2.isPlaying = true;
            starting_time = Date.now();
            current_time = starting_time;
        }
    }

    if(state == "prompt quipers") {
        promptQuipers();
    }
    else if(state == "prompt viewers") {
        promptViewers();
    }
    else if(state == "voting") {
        voting();
    }
    else if(state == "game over") {
        gameOver();
    }

    //Players are always displayed, and displayed as a top layer
    displayPlayers();
}

//State functions
function promptQuipers() {
    if(promptNotSent) {
        sendQuipPrompt(current_player1.name, current_player2.name, quip_prompts[current_quip_prompt_index]);
        promptNotSent = false;
    }
    current_time = Date.now();
    displayTimer(30);
    if(quips_recieved == 2 || ((current_time - starting_time) > 30400)) {
        promptQuipersDONE = true;
        quips_recieved = 0;
    }
    if(promptQuipersDONE) {
        console.log("Swapping to prompt viewers")
        state = "prompt viewers";
        promptQuipersDONE = false;
        promptNotSent = true;
        quip_prompt.setFontObj(quip_prompts[current_quip_prompt_index]);
        starting_time = Date.now();
        current_time = starting_time;
    }
}
function promptViewers() {
    displayQuipPrompt();

    current_time = Date.now();
    displayTimer(10);
    if((current_time - starting_time)  > 10400) {
        promptViewersDONE = true;
    }
    if(promptViewersDONE) {
        promptViewersDONE = false;
        console.log("Swapping to voting");
        state = "voting";
        starting_time = Date.now();
        current_time = starting_time;
    }
}
function voting() {
    //this only runs once (sets quips and sends voting prompt)
    if(quipsNotSet) {
        quipsNotSet = false;

        //arrange quips s.t. the left player's quip is on the left
        if(current_player1.player_number < current_player2.player_number) {
            //player 1 is on the left
            quip_1.setFontObj(quip_1_string, current_player1.font);
            quip_2.setFontObj(quip_2_string, current_player2.font);
        }
        else {
            //player 1 is on the right
            quip_1.setFontObj(current_player2.font, quip_2_string);
            quip_2.setFontObj(current_player1.font, quip_1_string);
        }
        //Send voting prompt
        sendVotingPrompt(current_player1.name, current_player2.name, quip_1_string, quip_2_string); 
    }

    displayQuipPrompt();
    displayQuips();
    displayVotes();


    current_time = Date.now();
    displayTimer(30);
    if( (current_time - starting_time) > 30400) {
        //30 seconds for voting
        votingDONE = true;
        tallyVotes();
    }
    //If 3 rounds have passed, it's game over
    if(votingDONE) {
        votingDONE = false;
        console.log("Matchup Completed");
        tallyVotes();

        ++matchupNumber;
        if(matchupNumber == 3) {
            ++roundNumber;
            matchupNumber = 1;
            if(roundNumber == 4) {
                console.log("Swapping to game over");
                current_player1.isPlaying = false;
                current_player2.isPlaying = false;
                state = "game over";
            }
            else {
                prepareNewMatchup();
            }
        }
        else {
            prepareNewMatchup();
        }
    }
}
function gameOver() {
    //determine the winner (only runs once)
    if(winnerNotDetermined) {
        winnerNotDetermined = false;

        winner = players[0];
        for(let i=1; i < players.length; ++i) {
            if(players[i].score > winner.score) {
                winner = players[i];
            }
        }
        winner_text = new Font(winner.name + "...", winner.font, "64px", "white", 200, 300);
        is_the_winner = new Font("is the winner! GG!", winner.font, "64px", "white", 270, 380);
    }
    winner_text.update();
    is_the_winner.update();
}

//State helper functions
function tallyVotes() {
    current_player1.incrementPlayerScore(player_1_numVotes);
    current_player2.incrementPlayerScore(player_2_numVotes);

    player_1_numVotes = 0;
    player_2_numVotes = 0;
}
function prepareNewMatchup() {
    current_player1.isPlaying = false;
    current_player2.isPlaying = false;
    if(roundNumber == 1) {
        if(matchupNumber == 2) {
            current_player1 = players[2];
            current_player2 = players[3];
        }
    }
    else if(roundNumber == 2) {
        if(matchupNumber == 1) {
            current_player1 = players[0];
            current_player2 = players[2];
        }
        else if(matchupNumber == 2) {
            current_player1 = players[1];
            current_player2 = players[3];
        }
    }
    else if(roundNumber == 3) {
        if(matchupNumber == 1) {
            current_player1 = players[0];
            current_player2 = players[3];
        }
        else if(matchupNumber == 2) {
            current_player1 = players[1];
            current_player2 = players[2];
        }
    }
    current_player1.isPlaying = true;
    current_player2.isPlaying = true;

    quip_1_string = "Poop";
    quip_2_string = "Poop";
    quipsNotSet = true;
    console.log("Swapping to prompt quipers");
    state = "prompt quipers";
    ++current_quip_prompt_index;
    starting_time = Date.now();
    current_time = starting_time;
}


//Image functions
function displayPlayers() {
    for(let i=0; i < players.length; ++i) {
        if(players[i].isPlaying) {
            players[i].drawStarBurst();
        }
    }
    for(let i=0; i < players.length; ++i) {
        players[i].displayPlayer();
    }   
}
function displayQuipPrompt() {
    quip_prompt.display();
}
function displayQuips() {
    quip_1.displayQuip();
    quip_2.displayQuip();
}
function displayTimer(timer_duration) {
    //timer_duration is the time that you wanted the timer to last when you started it
    timer.tick(timer_duration - Math.round((current_time - starting_time)/1000));
}

function displayVotes() {
    player_1_votes_obj = new Font("Votes: " + player_1_numVotes, "Arial", "22px", "green", 210, 425);
    player_2_votes_obj = new Font("Votes: " + player_2_numVotes, "Arial", "22px", "green", 700, 425);

    player_1_votes_obj.update();
    player_2_votes_obj.update();
}
