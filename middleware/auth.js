'use strict'; // https://www.w3schools.com/js/js_strict.asp

const { randomBytes } = require('node:crypto');
const JWT = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // checks for a logged in user ( if not logged in redirect to homepage )
    if (!req.session.isLoggedIn || !req.session.user) return res.redirect('/');
    next();
};

// extracts a "Bearer token" from authorization header
// or a token from a queryString
// or a token provided in a JSON body {"authorization":"jwt_token"}
const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    if (req.query && req.query.token) {
        return req.query.token;
    }
    if (req.body.authorization) {
        return req.body.token;
    }
    return null;
};

module.exports.authJWT = (req, res, next, app) => {
    // get the token feom request extracted
    let token = extractToken(req);
    if (!token) return next(); // if there is no token call next
    let decoded;
    try {
        decoded = JWT.verify(token, process.env.JWT_SECRET); // verify JWT
    } catch (error) {
        return next();
    }
    if (!decoded?.uuid) return next();
    // if the JWT token is valid search for the user and append the user data to the request
    app.db
        .queryAsync('users', { uuid: decoded.uuid })
        .then((users) => {
            let user = users[0];
            req.jwt = {
                authenticated: true,
                token: token,
                user: user
            };
            return next();
        })
        .catch((err) => next());
};

// appends the session by a random csrf token to validate requests
module.exports.injectCSRF = (req, res, next) => {
    if (!req.session.csrf) {
        req.session.csrf = randomBytes(100).toString('base64');
    }
    next();
};

// updates the session csrf token
module.exports.updateCSRF = (req) => {
    req.session.csrf = randomBytes(100).toString('base64');
};
