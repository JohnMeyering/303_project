//we will use these 2 variables in our when we send prompts
let user1 = "";
let user2 = "";

//This is global just to make dev easier. I know it's bad style
let socket;

//We will use these when we send prompts (global cause ez)
let data;
let query;

$(document).ready(function() {

	let mainContainer = $("#content");

	$("#room-key-form-tag").on("submit", function(event) {
		event.preventDefault();
		//Room is made implicitly
		//We need to delete the form and render the game
		mainContainer.html("");

		socket = new WebSocket("ws://192.168.1.14:8080/");

		//if we get to this line, then we have a connection
		function sendMessage(message) {
			socket.send(message);
		}

		//When we first connect
		socket.onopen = function(event) {
			console.log("Connected");
		}

		//Every time we recieve a message
		socket.onmessage = function(event) {
			//Dending on the queryType, we progress as required
			console.log("Message Recieved");
			let message = event.data;
			message = JSON.parse(message);
			console.log(message);
		}

		//If we lose connection
		socket.onclose = function(event) {
			console.log("Disconnected");
		}

	});

});




function sendQuipPrompt(user1, user2, quip_prompt) {
	data = {
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