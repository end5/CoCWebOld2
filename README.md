# Corruption of Champions Web Edition
 
 Here lies the web edition of Corruption of Champions.

For Devs:
Game setup instructions:
1. Clone this repo branch.
2. Download and install Node.js https://nodejs.org/
3. Open a console in the folder of the repo.
4. Type "npm install" to install everything.
5. Once everything is installed, type "npm run-script init" to setup the "Build" folder.
6. Type "npm run-script build", to build the the game.
To run: Open index.html in a browser

Parser Tester setup instructions:
1. If you haven't done them already, do steps 1-5 from above.
2. Type "npm run-script build:parser-tester" to install typings for CodeMirror.
To run: Open ParserTester/ParserTester.html in a browser

Linting:
1. Open a console in the folder of the repo.
2. Once installed, type "tslint -p . --fix" to run the linter and have the linter fix code style problems.
3. Fix any remaining errors that appear.
