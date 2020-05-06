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

login.php
2. register ajax (basically done, just need an if statement for when username is taken)
4. register php

profile.php
7. display name ajax
8. display color ajax
9. display name php
10. display color php
11. delete account php (no ajax)
12. JS validation (for the display name)

After all of that is done, then I can do game stuff