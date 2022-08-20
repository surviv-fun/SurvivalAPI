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

/**
 * deep update an object
 */
const deepUpdateObject = (target, update, keepExisting) => {
    for (const [key, value] of Object.entries(update)) {
        if (target.hasOwnProperty(key) && typeof value === typeof target[key]) {
            if (['string', 'number', 'boolean'].includes(typeof value) || Array.isArray(value)) {
                if (!keepExisting) target[key] = value;
            } else {
                if (typeof value === 'object') {
                    updateObject(target[key], value);
                }
            }
        }
    }
};

/**
 * deep update an object returning a copy
 */
const deepUpdateObjectCopy = (target, update, keepExisting) => {
    let targetCopy = { ...target };
    deepUpdateObject(targetCopy, update, keepExisting);
    return targetCopy;
};

module.exports.deepUpdateObject = deepUpdateObject;
module.exports.deepUpdateObjectCopy = deepUpdateObjectCopy;
