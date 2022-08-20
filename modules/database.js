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

'use strict'; // https://www.w3schools.com/js/js_strict.asp

const MongoClient = require('./mongo-client');
var client = new MongoClient(process.env.DATABASE_CONNECTION);

module.exports.setupDatabaseHandler = (app) => {
    app.db = {
        client: client,
    };
    app.db.queryAsync = async (collection, searchQuery) => app.db.client.queryAsync(process.env.DATABASE_NAME, collection, searchQuery);
    app.db.insertAsync = async (collection, data) => app.db.client.insertObjectAsync(process.env.DATABASE_NAME, collection, data);
    app.db.updateAsync = async (collection, searchQuery, data) => app.db.client.updateObjectAsync(process.env.DATABASE_NAME, collection, searchQuery, data);
    app.db.deleteAsync = async (collection, searchQuery) => app.db.client.deleteObjectAsync(process.env.DATABASE_NAME, collection, searchQuery);
    app.db.rawQueryAsync = async (database, collection, searchQuery) => app.db.client.queryAsync(database, collection, searchQuery);
    app.db.rawInsertAsync = async (database, collection, data) => app.db.client.insertObjectAsync(database, collection, data);
    app.db.rawUpdateAsync = async (database, collection, searchQuery, data) => app.db.client.updateObjectAsync(database, collection, searchQuery, data);
    app.db.rawDeleteAsync = async (database, collection, searchQuery) => app.db.client.deleteObjectAsync(database, collection, searchQuery);
};
