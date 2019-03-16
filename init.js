const fs = require('fs');

fs.exists('Build', (exists) => {
    if (!exists)
        fs.mkdir('Build', (err) => { if (err) throw err; });
});
fs.copyFile('node_modules/requirejs/require.js', 'Build/require.js', (err) => { if (err) throw err; });
fs.exists('Build/codemirror', (exists) => {
    if (!exists)
        fs.mkdir('Build/codemirror', (err) => { if (err) throw err; });
});
fs.exists('Build/codemirror/lib', (exists) => {
    if (!exists)
        fs.mkdir('Build/codemirror/lib', (err) => { if (err) throw err; });
});
fs.exists('Build/codemirror/theme', (exists) => {
    if (!exists)
        fs.mkdir('Build/codemirror/theme', (err) => { if (err) throw err; });
});
fs.copyFile('node_modules/codemirror/lib/codemirror.css', 'Build/codemirror/lib/codemirror.css', (err) => { if (err) throw err; });
fs.copyFile('node_modules/codemirror/lib/codemirror.js', 'Build/codemirror/lib/codemirror.js', (err) => { if (err) throw err; });
fs.copyFile('node_modules/codemirror/theme/lesser-dark.css', 'Build/codemirror/theme/lesser-dark.css', (err) => { if (err) throw err; });
