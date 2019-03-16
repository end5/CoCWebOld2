const fs = require('fs');

if (!fs.existsSync('Build'))
    fs.mkdirSync('Build');

fs.copyFileSync('node_modules/requirejs/require.js', 'Build/require.js');

if (!fs.existsSync('Build/codemirror'))
    fs.mkdirSync('Build/codemirror');

if (!fs.existsSync('Build/codemirror/lib'))
    fs.mkdirSync('Build/codemirror/lib');

fs.copyFileSync('node_modules/codemirror/lib/codemirror.css', 'Build/codemirror/lib/codemirror.css');
fs.copyFileSync('node_modules/codemirror/lib/codemirror.js', 'Build/codemirror/lib/codemirror.js');

if (!fs.existsSync('Build/codemirror/theme'))
    fs.mkdirSync('Build/codemirror/theme');

fs.copyFileSync('node_modules/codemirror/theme/lesser-dark.css', 'Build/codemirror/theme/lesser-dark.css');
