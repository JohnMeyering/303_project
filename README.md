wadup

sudo noip2 -S

When connecting from a different network than mine use this in the url bar: 76.175.116.225 OR meyering.gotdns.ch (THEY BOTH WORK, HOLY COW)
When connecting from my network, just use this in the url bar: 192.168.1.14

connect to the chat-server with: ws://192.168.1.14:8080/ (when on LAN)


//IT WORKS, I CAN ACCESS IT (use ws://meyering.gotdns.ch:8080)
//It works because we recieve input on our WAN external port 8080, and forward that to 192.168.1.14 port 8080
//Usually, the meyering.gotdns.ch has our WAN external port 80 as the default (the url:80 is implicit)


to run: php chat-server.php
to cancel: Ctrl+z -> ps aux | grep php -> kill -9 PID (the PID is the number on the left)
better cancel: Ctrl+z -> ps ux  => kill -9 PID


TODO

host.php
15. game div


No need to re-do any of the websocket server code until everything is done
It does what I need (not efficient, but efficiency is a stretch goal)



//Forget about everything below this, I'm just gonna impose a 4 player requirement
Make a hard 4+ player restriction
Make a hard even player count restriction


//Players must be global because JS does pass by value and shuffling won't work
let players_1 = array(of half of players)
let players_2 = array(of half of players)
let n be the number of players

//there will be n-1 rounds
for(let i=0; i < n-1; ++i) {
	playRound();
	shufflePlayers();
}

function shufflePlayers() {
	//player 1 doesn't move
	//all other players move clockwise
	//i.e. move down the last player in players_1
	//     and move up the first player in players_2

	let temp = players_2.shift();
	players_1.unshift(temp);

	//then swap the first two players in players_1 and move the last player in players_1 down
	temp = players_1[0];
	players_1[0] = players_1[1];
	players_1[1] = temp;

	temp = players_1.pop();
	players_2.push(temp);
}

function playRound() {
	for i in range(0, len(players_1)):
	 player_1 = players_1[i];
	 players_2 = players_2[i];
	 prepareQuipers(players_1[i], players_2[i]);
	 displayQuips(); //uses global player_1 and player_2 objs, display prompt -> display quips
	 vote(); //uses global player_1 and player_2 obj's, displays vote counter on each speach bubble
	 reset_props(); //hides the prompt, speech bubbles/quips, highlighting images behind the players
}