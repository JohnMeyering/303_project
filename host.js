//all globals are declared here
var gameStarted = false;

//we will use these 2 variables in our when we send prompts
var current_player1 = "";
var current_player2 = "";

//we will use this array for long-time reference
var players = new Array();

//This is global just to make dev easier. I know it's bad style
var socket;

//We will use these when we send prompts (global cause ez)
var data;
var query;
var room_key;

$(document).ready(function() {

	let mainContainer = $("#content");

	$("#room-key-form-tag").on("submit", function(event) {
		event.preventDefault();
		//Room is made implicitly
		//We need to delete the form and render the game
		room_key = $("#room-key-input").val();
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
					let new_player = new Player(display_name, display_color, display_font);
					players.push(new_player);
				} 
				else if(gameStarted) {
					//handle quips
					if(message.queryType == "quip") {
						console.log("Handling quip: " + message.data.quip)
					}
					//handle votes
					else if(message.queryType == "vote") {
						console.log("Handling vote: " + message.data.vote);
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
class Player {
	constructor(display_name, display_color, display_font) {
		this.name = display_name;
		this.color = display_color;
		this.font = display_font;
	}
}