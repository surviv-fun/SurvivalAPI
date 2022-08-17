'use strict'; // https://www.w3schools.com/js/js_strict.asp

module.exports = {
    apps: [
        {
            name: 'surviv-api',
            script: 'server.js',
            instances: 1,
            exec_mode: 'fork',
            watch: true,
            autorestart: true,
            ignore_watch: ['./.git/*', './.ignore_watch/*', './node_modules/*', './cache.json']
        }
    ]
};
