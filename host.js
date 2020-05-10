//all globals are declared here
var gameStarted = false;
var state = "waiting for players";
var promptQuipersDONE = false;
var promptNotSent = true;
var quipsNotSet = true;
var promptViewersDONE = false;
var votingDONE = false;
var roundNumber = 1;     //3 rounds
var matchupNumber = 1;   //2 matchups per round

var staring_time; //Time in milliseconds since 1970/01/01 (multiply by 1000 for seconds) (use at start of phase)
var current_time;

//we will use these 2 variables in our when we send prompts
var current_player1; //They are both Player objects
var current_player2;
var player_1_numVotes = 0;
var player_2_numVotes = 0;

var player_1_votes_obj;
var player_2_votes_obj;

var quip_1; //The Quip objs
var quip_2;
var quip_1_string = "Poop";
var quip_2_string = "Poop";
var current_quip_prompt_index = 0;
var quip_prompts = new Array();
var timer;

var winnerNotDetermined = true;
var winner;
var winner_text;
var is_the_winner;

quips_recieved = 0;

//we will use this array for long-time reference
var players = new Array();

//This is global just to make dev easier. I know it's bad style
var socket;

//We will use these when we send prompts (global cause ez)
var data;
var query;
var room_key;

$(document).ready(function() {

	getQuipPrompts();

	let mainContainer = $("#content");

	$("#room-key-form-tag").on("submit", function(event) {
		event.preventDefault();
		//Room is made implicitly
		//We need to delete the form and render the game
		room_key = $("#room-key-input").val();
		let error = $("#room-key-input-error-message");
		//Validation
		if(room_key.length != 4) {
			error.text("The Key must be 4 characters!");
			return;
		}


		mainContainer.html("");

		socket = new WebSocket("ws://192.168.1.14:8080/");

		//if we get to this line, then we have a connection
		function sendMessage(message) {
			socket.send(message);
		}

		//When we first connect
		socket.onopen = function(event) {
			console.log("Connected");
			gameStarted = true;
			startGame();
		}

		//Every time we recieve a message
		socket.onmessage = function(event) {
			//Dending on the queryType, we progress as required
			console.log("Message Recieved");
			let message = event.data;
			message = JSON.parse(message);
			console.log(message);

			if(message.data.room_key == room_key) {
				//handle new users
				if(message.queryType == "join" && players.length < 4) {
					console.log("Adding new player: " + message.data.display_name);
					let display_name = message.data.display_name;
					let display_color = message.data.display_color;
					let display_font = message.data.display_font;
					let player_number = players.length;
					let new_player = new Player(display_name, display_color, display_font, player_number);
					players.push(new_player);
					console.log("New Player " + new_player.name + " added to the list");

					if(players.length == 4)  {
						gameStarted = true;
					}
				} 
				else if(gameStarted) {
					//handle quips
					if(message.queryType == "quip") {
						if(state == "prompt quipers") {
							console.log("Handling quip: " + message.data.quip)

							if(quips_recieved < 2) {
								if(message.data.display_name == current_player1.name) {
									quip_1_string = message.data.quip;
									++quips_recieved;
								}
								else if(message.data.display_name == current_player2.name) {
									quip_2_string = message.data.quip;
									++quips_recieved;
								}
							}
						}	
					}
					//handle votes
					else if(message.queryType == "vote") {
						console.log("Handling vote: " + message.data.vote);
						if(state == "voting" || state == "prompt viewers") {
							if(message.data.vote == current_player1.name) {
								++player_1_numVotes;
							}
							else if(message.data.vote == current_player2.name) {
								++player_2_numVotes;
							}
						}
					}
				}				
			}
		}

		//If we lose connection
		socket.onclose = function(event) {
			console.log("Disconnected");
		}

	});

});




function sendQuipPrompt(user1, user2, quip_prompt) {
	data = {
		room_key: room_key,
		user1: user1,
		user2: user2,
		quip_prompt: quip_prompt
	}
	query = new Query("quip_prompt", data);
	query = JSON.stringify(query);
	sendMessage(query);
}
function sendVotingPrompt(user1, user2, quip1, quip2) {
	data = {
		room_key: room_key,
		user1: user1,
		user2: user2,
		quip1: quip1,
		quip2: quip2
	}
	query = new Query("voting_prompt", data);
	query= JSON.stringify(query);
	sendMessage(query);
}

function sendMessage(message) {
	console.log("Sending message: " + message);
	socket.send(message);
}

class Query {
	constructor(queryType, data) {
		//data is a JS object with relevant information to the queryType
		//ex. data = {display_name: "John", display_color: "#FFFFFF"}
		this.queryType = queryType;
		this.data = data;
	}
}

// https://javascript.info/task/shuffle
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function getQuipPrompts() {
	$.ajax({
		method: "POST",
		url: "src/quip_service.php"
	}).done(function(response) {
		response = JSON.parse(response);
		for(let i=0; i < response.length; ++i) {
			quip_prompts.push(response[i]);
		}
		shuffle(quip_prompts);
	});
}