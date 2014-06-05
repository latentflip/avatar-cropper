.PHONY: test

all: dist

clean:
	rm templates.js

dist: templates.js

demo: server
server: dist
	./node_modules/.bin/beefy demo.js --cwd demo --live --open

test: templates.js
	./node_modules/.bin/faucet

templates.js: templates/*.dom
	./node_modules/.bin/domthing templates > templates.js
