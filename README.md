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
It does what I need (not efficient, but effieciency is a stretch goal)