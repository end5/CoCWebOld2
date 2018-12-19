﻿# Corruption of Champions Web Edition
 
 Here lies the web edition of Corruption of Champions.

Setup instructions for devs:
1. Clone this repo branch.
2. Download and install Node.js https://nodejs.org/
3. Open a console in the folder of the repo.
4. Type "npm install -g typescript" to install Typescript
5. Once Typescript is installed, type "tsc -p tsconfig.json" to compile the code.
6. Download RequireJS https://requirejs.org and move the file to the "Build" folder.

Linting:
1. Open a console in the folder of the repo.
2. Type "npm install -g tslint" to install TSLint
3. Once installed, type "tslint -p . --fix" to run the linter and fix most things.
4. Fix any remaining errors that appear.
