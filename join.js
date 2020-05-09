$(document).ready(function() {
	/*We will handle submission of 3 Forms:
	   -join-form-tag
	   -voting-form-tag
	   -quip-form-tag

	  Join intiates the websocket connection
	  Voting sends a vote over the websocket
	  Favorite makes and AJAX call to favorite_service.php
	  Quip sends a quip over the websocket
	*/
	let mainContainer = $("#content");
	let data; //we will use these data and query vars a lot
	let query;
	let room_key;

	$("#join-form-tag").on("submit", function(event) {
		event.preventDefault();
		//Do input validation
		//If no errors:
		//  Join the room
		//  (First make connection, then send a 'join' Query)

		//Validation
		let noErrors = true;
		room_key = $("#room-key-input").val();
		let room_key_input_error_message = $("#room-key-input-error-message");

		if(room_key == "") {
			room_key_input_error_message.text("Please Enter a Room Key");
			noErrors = false;
		}
		if(room_key.length != 4) {
			room_key_input_error_message.text("Please Enter a 4 Character Room Key");
			noErrors = false;
		}

		if(noErrors) {
			let socket = new WebSocket("ws://192.168.1.14:8080/");

			//if we get to this line, then we have a connection
			let display_name = $("#display_name").text();
			let display_color = $("#display_color").text();
			let display_font = $("#display_font").text();
			function sendMessage(message) {
				console.log("Sending message: " + message);
				socket.send(message);
			}

			//When we first connect
			socket.onopen = function(event) {
				console.log("Connected");

				//Clear the screen and append the connected div
				mainContainer.html("");
				let connectedHTML = `
				<!-- CONNECTED -->
				<div class="container-fluid">
					<div class="row justify-content-center">
						<div class="col col-10 col-sm-8 col-md-6 col-lg-4 form">
							<h2 class="text-white align-middle center-text">Connected!</h2>
						</div>
					</div>
				</div>
				<!-- END OF CONNECTED -->
				`;
				mainContainer.append(connectedHTML);

				//Send the 'join' Query
				data = {
					room_key: room_key,
					display_name: display_name,
					display_color: display_color,
					display_font: display_font
				};
				query = new Query("join", data);
				query = JSON.stringify(query);
				sendMessage(query);
			}

			//Every time we recieve a message
			socket.onmessage = function(event) {
				//Dending on the queryType, we display the proper elements
				console.log("Message Recieved");
				let message = event.data;
				message = JSON.parse(message);
				console.log(message);

				//QUIP PROMPT
				if(message.data.room_key == room_key) {
					if(message.queryType == "quip_prompt") {
						if(message.data.user1 == display_name || message.data.user2 == display_name) {
							//It's our turn to quip
							console.log("My turn to quip");

							//Clear the screen and fill it with the quip div
							mainContainer.html("");
							let quipHTML = `
							<!-- QUIP -->
							<div class="container-fluid" id="quip-container">
								<div class="row justify-content-center">
									<div class="col col-10 col-sm-8 col-md-6 col-lg-4 form" id="quip-form">

										<div class="text-white center-text">${ message.data.quip_prompt }</div>
										<hr>

										<form id="quip-form-tag">
											<label for="quip-input" class="text-white align-middle center-text">Enter your quip!</label>
											<textarea name="quip-input" form="quip-form-tag" id="quip-input" class="form-control form-margin" maxlength="64" autocomplete="off" autocorrect="off" placeholder="Max 64 Characters"></textarea>

											<button type="submit" class="btn form-control form-margin btn-white"><i class="fas fa-comment-alt"></i> Quip!</button>
										</form>

									</div>
								</div>
							</div>
							<!-- END OF QUIP -->
							`;
							mainContainer.append(quipHTML);

							//Setup the form handling for the quip-form-tag
							$("#quip-form-tag").on("submit", function(event) {
								event.preventDefault();
								//All we need to do is a make a 'quip' Query, send it,
								//and clear the screen
								let quip = $("#quip-input").val();

								data = {
									room_key: room_key,
									display_name: display_name,
									quip: quip
								};
								query = new Query("quip", data);
								query = JSON.stringify(query);
								sendMessage(query);

								mainContainer.html("");
							});
						}
					}
					//VOTING
					if(message.queryType == "voting_prompt") {
						if(message.data.user1 != display_name && message.data.user2 != display_name) {
							//It's our turn to vote
							console.log("My turn to vote");

							//clear the screen and fill it with the voting div
							mainContainer.html("");

							let votingHTML = `
							<!-- VOTING -->
							<div class="container-fluid" id="voting-container">
								<div class="row justify-content-center">
									<div class="col col-10 col-sm-8 col-md-6 col-lg-4 form" id="voting-form">
										<form id=voting-form-tag>
											<label for="voting-input" class="text-white align-middle center-text">Who was better?</label>
											<div class="row justify-content-center">
												<div class="col col-12 text-white">
													<input name="voting-input" type="radio" id="quip1" value="${ message.data.user1 }">
													<label for="quip1" class="text-white">${ message.data.user1 }</label>
													<p>${ message.data.quip1 }</p>
													<hr>
												</div>
											</div>
											<div class="row justify-content-center">
												<div class="col col-12 text-white">
													<input name="voting-input" type="radio" id="quip2" value="${ message.data.user2 }">
													<label for="quip2" class="text-white">${ message.data.user2 }</label>
													<p>${ message.data.quip2 }</p>
												</div>
											</div>

											<button type="submit" class="btn form-control form-margin btn-white"><i class="fas fa-vote-yea"></i> Vote!</button>
										</form>
									</div>
								</div>
							</div>
							<!-- END OF VOTING -->
							`;

							mainContainer.append(votingHTML);

							//setup the form handling for the voting-form-tag
							$("#voting-form-tag").on("submit", function(event) {
								event.preventDefault();
								//All we need to do is make a 'quip' Query, send it,
								//and clear the screen
								let vote = $("input[name='voting-input']:checked").val();
								console.log(vote);
								data = {
									room_key: room_key,
									vote: vote
								};
								query = new Query("vote", data);
								query = JSON.stringify(query);
								sendMessage(query);

								mainContainer.html("");
							})
						}
					}
				}
				
			}

			//If we lose connection
			socket.onclose = function(event) {
				console.log("Disconnected");
			}
		}

	});

});

class Query {
	constructor(queryType, data) {
		//data is a JS object with relevant information to the queryType
		//ex. data = {display_name: "John", display_color: "#FFFFFF"}
		this.queryType = queryType;
		this.data = data;
	}
}