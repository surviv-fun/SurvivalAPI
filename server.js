/**
 * Copyright (c) LuciferMorningstarDev <contact@lucifer-morningstar.dev>
 * Copyright (c) surviv.fun <contact@surviv.fun>
 * Copyright (C) surviv.fun team and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

'use strict'; // https://www.w3schools.com/js/js_strict.asp

// append process.env object by some system variables ( ./.env )
require('dotenv').config();

// add global fetch extension
import('node-fetch').then(({ default: fetch }) => {
    global.fetch = fetch;
});

// imports
const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const compression = require('compression');
const serveFavicon = require('serve-favicon');
const cookieParser = require('cookie-parser');

const PING = require('minecraft-ping');

const mongoSession = require('express-mongodb-session');
const session = require('express-session');

var ComponentSerializer;
(async () => {
    const { default: serializer } = await import('./node_modules/minecraft-components/lib/ComponentSerializer.js');
    ComponentSerializer = serializer;
})();

// load package.json information
const packageJSON = require('./package.json');

const port = process.env.PORT;
// default and public paths
const defaultPath = __dirname.endsWith('/') ? __dirname : __dirname + '/';
const publicPath = defaultPath + 'public/';

// create the express application
const app = express();

// enable module caching by adding a new global require function
app.modules = {};
global.moduleRequire = (mod) => {
    if (app.modules[mod]) return app.modules[mod];
    app.modules[mod] = require(mod);
    return app.modules[mod];
};

// load database handler, initialite it, and append it to express-app
require('./modules/database').setupDatabaseHandler(app);

// sessions setup
const MongoDBStore = mongoSession(session); // makes sessions saved in mongo database
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MongoDBStore({
            uri: process.env.DATABASE_CONNECTION,
            collection: 'sessions'
        })
    })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('json spaces', 4);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// authentication
const auth = require('./middleware/auth');
// for security reason remove the powered by header
app.use(require('./middleware/removePoweredBy'));
// CORS Policy things
app.use(require('./middleware/cors'));
// Content security headers
app.use(require('./middleware/contentSecurityPolicy'));

// adding jwt authentication for api
app.use(auth.injectCSRF);

// serve favicon on each request
app.use(require('serve-favicon')(publicPath + 'favicon.ico'));

// inject csrf token
app.use((req, res, next) => auth.authJWT(req, res, next, app));

// Basic redirects
app.get('/github', async (_, res) => res.redirect('https://github.com/surviv-fun'));
app.get('/discord', async (_, res) => res.redirect('https://discord.gg/9SmcRjW9QT'));
app.get('/join', async (_, res) => res.redirect('https://discord.gg/9SmcRjW9QT'));
app.get('/email', async (_, res) => res.redirect('mailto:contact@surviv.fun'));

// loads the robots.txt ( SEO )
app.get('/robots.txt', async (_, res) => res.sendFile(publicPath + 'robots.txt'));

app.get('/ping', async (_, res) => {
    const pingData = await PING.pingUri('minecraft://play.surviv.fun:25565');

    let elements = {};

    if (pingData?.description && ComponentSerializer) {
        const motd = ComponentSerializer.fromJsonData(pingData?.description);
        const motdHtml = motd.html();
        const motdJson = motd.json();
        const motdPlain = motd.plain();
        const motdSerialized = motd.serialized();
        elements.motd_html = motdHtml;
        elements.motd_json = motdJson;
        elements.motd_plain = motdPlain;
        elements.motd_serialized = motdSerialized;

        elements.motd_styles = fs.readFileSync('./node_modules/minecraft-components/css/components.min.css', 'utf-8');
        elements.eval_load_styles = `
function loadCSS(cssStyles) {
  const link = document.createElement('link');
  link.href = \`data:text/css;base64,\${btoa(cssStyles)}\`;
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].appendChild(link);
}
loadCSS(${elements.motd_styles})        
        `;
    }

    res.status(200).json({
        error: false,
        ping: {
            elements,
            ...pingData
        }
    });
});

// send a 404 at each request if route not found
app.all('*', async (req, res) => res.status(404).json({ error: true, message: 'not found', code: 404 }));
// Finally create listener for given port or default 3000
app.listen(port || 3000, () => {
    console.log('[ PRODUCTION ] » API Server is now running on Port: ' + port);
});
