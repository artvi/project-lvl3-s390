install:
	npm install
start:
	npm run babel-node -- src/bin/rss-reader.js
lint:
	npx eslint .
