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

var contentSecurity = [
    "default-src https: 'self' cdn.jsdelivr.net",
    "script-src https: 'self' 'unsafe-inline' cdn.jsdelivr.net cdnjs.cloudflare.com",
    "connect-src 'none'",
    "style-src 'self' 'unsafe-inline' cdnjs.cloudflare.com cdn.jsdelivr.net fonts.googleapis.com necolas.github.io",
    "img-src 'self'",
    "font-src 'self' cdnjs.cloudflare.com fonts.googleapis.com fonts.gstatic.com"
];

module.exports = (req, res, next) => {
    res.header('Content-Security-Policy', contentSecurity.join('; '));
    next();
};
