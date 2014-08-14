.PHONY: test

all: demo

demo: server

server:
	./node_modules/.bin/beefy demo.js --cwd demo

test:
	./node_modules/.bin/faucet
