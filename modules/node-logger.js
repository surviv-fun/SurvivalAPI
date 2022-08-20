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

// Copyright © 2022 | LuciferMorningstarDev | All Rights Reserved | ( Email: contact@lucifer-morningstar.dev )

/**
 * BetterLogger.js | Copyright (c) 2022 | LuciferMorningstarDev
 *
 * This project is licensed under the MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict'; // https://www.w3schools.com/js/js_strict.asp

var dateRegex = /(?=(YYYY|YY|MM|DD|HH|mm|ss|ms))\1([:\/]*)/g;
var tineSpan = {
    YYYY: ['getFullYear', 4],
    YY: ['getFullYear', 2],
    MM: ['getMonth', 2, 1], // getMonth is zero-based, thus the extra increment field
    DD: ['getDate', 2],
    HH: ['getHours', 2],
    mm: ['getMinutes', 2],
    ss: ['getSeconds', 2],
    ms: ['getMilliseconds', 3],
};
var TimeStamp = function (str, date, utc) {
    if (typeof str !== 'string') {
        date = str;
        str = 'YYYY-MM-DD';
    }
    if (!date) date = new Date();
    return str.replace(dateRegex, function (match, key, rest) {
        var args = tineSpan[key];
        var name = args[0];
        var chars = args[1];
        if (utc === true) name = 'getUTC' + name.slice(3);
        var val = '00' + String(date[name]() + (args[2] || 0));
        return val.slice(-chars) + (rest || '');
    });
};

TimeStamp.utc = function (str, date) {
    return TimeStamp(str, date, true);
};

const TerminalTextFormat = {};
TerminalTextFormat.ESCAPE = '\u001b';

TerminalTextFormat.BLINK = TerminalTextFormat.ESCAPE + '[5m';

TerminalTextFormat.BLACK = TerminalTextFormat.ESCAPE + '[30m';
TerminalTextFormat.DARK_BLUE = TerminalTextFormat.ESCAPE + '[34m';
TerminalTextFormat.DARK_GREEN = TerminalTextFormat.ESCAPE + '[32m';
TerminalTextFormat.DARK_AQUA = TerminalTextFormat.ESCAPE + '[36m';
TerminalTextFormat.DARK_RED = TerminalTextFormat.ESCAPE + '[31m';
TerminalTextFormat.DARK_PURPLE = TerminalTextFormat.ESCAPE + '[35m';
TerminalTextFormat.GOLD = TerminalTextFormat.ESCAPE + '[33m';
TerminalTextFormat.GRAY = TerminalTextFormat.ESCAPE + '[37m';
TerminalTextFormat.DARK_GRAY = TerminalTextFormat.ESCAPE + '[30;1m';
TerminalTextFormat.BLUE = TerminalTextFormat.ESCAPE + '[34;1m';
TerminalTextFormat.GREEN = TerminalTextFormat.ESCAPE + '[32;1m';
TerminalTextFormat.AQUA = TerminalTextFormat.ESCAPE + '[36;1m';
TerminalTextFormat.RED = TerminalTextFormat.ESCAPE + '[31;1m';
TerminalTextFormat.LIGHT_PURPLE = TerminalTextFormat.ESCAPE + '[35;1m';
TerminalTextFormat.YELLOW = TerminalTextFormat.ESCAPE + '[33;1m';
TerminalTextFormat.WHITE = TerminalTextFormat.ESCAPE + '[37;1m';

TerminalTextFormat.OBFUSCATED = TerminalTextFormat.ESCAPE + '[47m';
TerminalTextFormat.BOLD = TerminalTextFormat.ESCAPE + '[1m';
TerminalTextFormat.STRIKETHROUGH = TerminalTextFormat.ESCAPE + '[9m';
TerminalTextFormat.UNDERLINE = TerminalTextFormat.ESCAPE + '[4m';
TerminalTextFormat.ITALIC = TerminalTextFormat.ESCAPE + '[3m';
TerminalTextFormat.RESET = TerminalTextFormat.ESCAPE + '[0m';

const TextFormat = {};
TextFormat.ESCAPE = '\u00A7';
TextFormat.BLACK = TextFormat.ESCAPE + '0';
TextFormat.DARK_BLUE = TextFormat.ESCAPE + '1';
TextFormat.DARK_GREEN = TextFormat.ESCAPE + '2';
TextFormat.DARK_AQUA = TextFormat.ESCAPE + '3';
TextFormat.DARK_RED = TextFormat.ESCAPE + '4';
TextFormat.DARK_PURPLE = TextFormat.ESCAPE + '5';
TextFormat.GOLD = TextFormat.ESCAPE + '6';
TextFormat.GRAY = TextFormat.ESCAPE + '7';
TextFormat.DARK_GRAY = TextFormat.ESCAPE + '8';
TextFormat.BLUE = TextFormat.ESCAPE + '9';
TextFormat.GREEN = TextFormat.ESCAPE + 'a';
TextFormat.AQUA = TextFormat.ESCAPE + 'b';
TextFormat.RED = TextFormat.ESCAPE + 'c';
TextFormat.LIGHT_PURPLE = TextFormat.ESCAPE + 'd';
TextFormat.YELLOW = TextFormat.ESCAPE + 'e';
TextFormat.WHITE = TextFormat.ESCAPE + 'f';

TextFormat.OBFUSCATED = TextFormat.ESCAPE + 'k';
TextFormat.BOLD = TextFormat.ESCAPE + 'l';
TextFormat.STRIKETHROUGH = TextFormat.ESCAPE + 'm';
TextFormat.UNDERLINE = TextFormat.ESCAPE + 'n';
TextFormat.ITALIC = TextFormat.ESCAPE + 'o';
TextFormat.RESET = TextFormat.ESCAPE + 'r';

TextFormat.tokenize = function (str) {
    return str.split(new RegExp('(' + TextFormat.ESCAPE + '[0123456789abcdefklmnor])')).filter((v) => v !== '');
};

TextFormat.clean = function (str, removeFormat = true) {
    if (removeFormat) {
        return str
            .replace(new RegExp(TextFormat.ESCAPE + '[0123456789abcdefklmnor]', 'g'), '')
            .replace(/\x1b[\\(\\][[0-9;\\[\\(]+[Bm]/g, '')
            .replace(new RegExp(TextFormat.ESCAPE, 'g'), '');
    }
    return str.replace(/\x1b[\\(\\][[0-9;\\[\\(]+[Bm]/g, '').replace(/\x1b/g, '');
};

TextFormat.toTerminal = function (str) {
    //make this better
    str = TextFormat.tokenize(str);
    str.forEach((v, k) => {
        switch (v) {
            case TextFormat.BLACK:
                str[k] = TerminalTextFormat.BLACK;
                break;
            case TextFormat.DARK_BLUE:
                str[k] = TerminalTextFormat.DARK_BLUE;
                break;
            case TextFormat.DARK_GREEN:
                str[k] = TerminalTextFormat.DARK_GREEN;
                break;
            case TextFormat.DARK_AQUA:
                str[k] = TerminalTextFormat.DARK_AQUA;
                break;
            case TextFormat.DARK_RED:
                str[k] = TerminalTextFormat.DARK_RED;
                break;
            case TextFormat.DARK_PURPLE:
                str[k] = TerminalTextFormat.DARK_PURPLE;
                break;
            case TextFormat.GOLD:
                str[k] = TerminalTextFormat.GOLD;
                break;
            case TextFormat.GRAY:
                str[k] = TerminalTextFormat.GRAY;
                break;
            case TextFormat.DARK_GRAY:
                str[k] = TerminalTextFormat.DARK_GRAY;
                break;
            case TextFormat.BLUE:
                str[k] = TerminalTextFormat.BLUE;
                break;
            case TextFormat.GREEN:
                str[k] = TerminalTextFormat.GREEN;
                break;
            case TextFormat.AQUA:
                str[k] = TerminalTextFormat.AQUA;
                break;
            case TextFormat.RED:
                str[k] = TerminalTextFormat.RED;
                break;
            case TextFormat.LIGHT_PURPLE:
                str[k] = TerminalTextFormat.LIGHT_PURPLE;
                break;
            case TextFormat.YELLOW:
                str[k] = TerminalTextFormat.YELLOW;
                break;
            case TextFormat.WHITE:
                str[k] = TerminalTextFormat.WHITE;
                break;

            case TextFormat.BOLD:
                str[k] = TerminalTextFormat.BOLD;
                break;
            case TextFormat.OBFUSCATED:
                str[k] = TerminalTextFormat.OBFUSCATED;
                break;
            case TextFormat.ITALIC:
                str[k] = TerminalTextFormat.ITALIC;
                break;
            case TextFormat.UNDERLINE:
                str[k] = TerminalTextFormat.UNDERLINE;
                break;
            case TextFormat.STRIKETHROUGH:
                str[k] = TerminalTextFormat.STRIKETHROUGH;
                break;
            case TextFormat.RESET:
                str[k] = TerminalTextFormat.RESET;
                break;
        }
    });

    return str.join('');
};

class Logger {
    constructor(caller, subCaller = '') {
        this.debuggingLevel = 0;
        this.caller = caller;
        this.subCaller = subCaller !== '' ? ' ' + subCaller : '';
    }

    emergency() {
        return this.out('Emergency', arguments, TerminalTextFormat.RED + TerminalTextFormat.BLINK);
    }

    alert() {
        return this.out('Alert', arguments, TerminalTextFormat.RED);
    }

    critical() {
        return this.out('Critical', arguments, TerminalTextFormat.RED);
    }

    error() {
        return this.out('Error', arguments, TerminalTextFormat.DARK_RED);
    }

    warning() {
        return this.out('Warning', arguments, TerminalTextFormat.YELLOW);
    }

    warn() {
        return this.out('Warning', arguments, TerminalTextFormat.YELLOW);
    }

    notice() {
        return this.out('Notice', arguments, TerminalTextFormat.DARK_GREEN);
    }

    info() {
        return this.out('Info', arguments, TerminalTextFormat.GREEN);
    }

    log() {
        return this.out('Info', arguments, TerminalTextFormat.WHITE);
    }

    debug() {
        if (this.debuggingLevel < 1) return;
        return this.out('Debug', arguments, TerminalTextFormat.AQUA);
    }

    request() {
        if (this.debuggingLevel < 1) return;
        return this.out('Request', arguments, TerminalTextFormat.GRAY);
    }

    debugExtensive() {
        if (this.debuggingLevel < 2) return;
        return this.out('Debug', arguments, TerminalTextFormat.AQUA);
    }

    logError(error) {
        error = error.stack.split('\n');
        this.error(error.shift());
        error.forEach((trace) => this.debug(trace));
    }

    clear() {
        return console.clear();
    }

    /**
     * @param level    String
     * @param messages Array
     * @param color    TerminalTextFormat.COLOR
     */
    out(level, messages, color = TerminalTextFormat.GRAY) {
        if (messages.length === 0) return;

        messages = Array.from(messages).map((message) => (typeof message === 'string' ? TextFormat.toTerminal(message) : message) + TerminalTextFormat.RESET);

        out(TerminalTextFormat.BLUE + '[' + TimeStamp('HH:mm:ss') + ']' + TerminalTextFormat.RESET + ' ' + color + '[' + this.caller + ' > ' + level + ']:' + this.subCaller, messages);

        function out(prefix, args) {
            console.log(prefix, ...args);
        }
    }

    setDebugging(level) {
        this.debuggingLevel = level;
        return this;
    }
}

class StaticLogger {
    static debuggingLevel = 0;
    static caller = 'Logger';
    static subCaller = 'Static';

    static emergency() {
        StaticLogger.out('Emergency', arguments, TerminalTextFormat.RED + TerminalTextFormat.BLINK);
    }

    static alert() {
        StaticLogger.out('Alert', arguments, TerminalTextFormat.RED);
    }

    static critical() {
        StaticLogger.out('Critical', arguments, TerminalTextFormat.RED);
    }

    static error() {
        StaticLogger.out('Error', arguments, TerminalTextFormat.DARK_RED);
    }

    static warning() {
        StaticLogger.out('Warning', arguments, TerminalTextFormat.YELLOW);
    }

    static warn() {
        StaticLogger.out('Warning', arguments, TerminalTextFormat.YELLOW);
    }

    static notice() {
        StaticLogger.out('Notice', arguments, TerminalTextFormat.DARK_GREEN);
    }

    static info() {
        StaticLogger.out('Info', arguments, TerminalTextFormat.GREEN);
    }

    static log() {
        StaticLogger.out('Info', arguments, TerminalTextFormat.WHITE);
    }

    static debug() {
        if (StaticLogger.debuggingLevel < 1) return;
        StaticLogger.out('Debug', arguments, TerminalTextFormat.AQUA);
    }

    static request() {
        if (StaticLogger.debuggingLevel < 1) return;
        StaticLogger.out('Request', arguments, TerminalTextFormat.GRAY);
    }

    static debugExtensive() {
        if (StaticLogger.debuggingLevel < 2) return;
        StaticLogger.out('Debug', arguments, TerminalTextFormat.AQUA);
    }

    static logError(error) {
        error = error.stack.split('\n');
        StaticLogger.error(error.shift());
        error.forEach((trace) => StaticLogger.debug(trace));
    }

    static clear() {
        console.clear();
    }

    /**
     * @param level    String
     * @param messages Array
     * @param color    TerminalTextFormat.COLOR
     */
    static out(level, messages, color = TerminalTextFormat.GRAY) {
        if (messages.length === 0) return;
        messages = Array.from(messages).map((message) => (typeof message === 'string' ? TextFormat.toTerminal(message) : message) + TerminalTextFormat.RESET);
        out(TerminalTextFormat.BLUE + '[' + TimeStamp('HH:mm:ss') + ']' + TerminalTextFormat.RESET + ' ' + color + '[' + StaticLogger.caller + ' > ' + level + ']:' + StaticLogger.subCaller, messages);
        function out(prefix, args) {
            console.log(prefix, ...args);
        }
    }

    static setDebugging(level) {
        StaticLogger.debuggingLevel = level;
    }
}

module.exports = {
    Logger: Logger,
    TextFormat: TextFormat,
    StaticLogger: StaticLogger,
    TerminalTextFormat: TerminalTextFormat,
};
