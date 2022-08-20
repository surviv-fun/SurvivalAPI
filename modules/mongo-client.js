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

const { MongoClient } = require('mongodb');

const DRIVER_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

class MongoDatabaseHandler {
    /**
     * Get the instance of the driver by giving a connection String
     * @param {String} connectionString
     */
    constructor(connectionString) {
        this.connectionString = connectionString;
    }

    /**
     * Get the instance of the driver by giving simply the following parameter ( wthout connection String )
     * @param {String} username
     * @param {String} password
     * @param {String} host
     * @param {Integer} port
     * @param {String} authenticationDatabase
     */
    static simple(username, password, host, port, authenticationDatabase) {
        if (!username || !password || !host) {
            throw new Error('Username Password and Host MUST be given.');
        }
        return new NodejsMongoDriver(`mongodb://${username}:${password}@${host}:${port != null ? port : '27017'}/${authenticationDatabase != null ? authenticationDatabase : 'admin'}`);
    }

    /**
     * Create a database at your MongoDB instance
     * @param {String} databaseName
     * @param {CallableFunction} callbackFunction
     */
    createDatabase = (databaseName, callbackFunction) => {
        MongoClient.connect(this.connectionString + databaseName, DRIVER_OPTIONS, function (error, db) {
            if (error) return callbackFunction(false, error);
            db.close();
            if (callbackFunction) callbackFunction(true);
        });
    };

    /**
     * Async creation of a database at your MongoDB instance
     * @param {String} databaseName
     * @returns {Promise<Object>}
     */
    createDatabaseAsync = async (databaseName) => {
        return new Promise((resolve, reject) => {
            this.createDatabase(this.connectionString, databaseName, (result, err) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    };

    /**
     * Create a collection in your given database
     * @param {String} databaseName
     * @param {String} collectionName
     * @param {CallableFunction} callbackFunction
     */
    createCollection = (databaseName, collectionName, callbackFunction) => {
        MongoClient.connect(this.connectionString, DRIVER_OPTIONS, (error, db) => {
            if (error) return callbackFunction(false, error);
            var dbf = db.db(databaseName);
            dbf.createCollection(collectionName, function (err, result) {
                if (err) return callbackFunction(false, err);
                db.close();
                if (callbackFunction) callbackFunction(true);
            });
        });
    };

    /**
     * Async creation of a collection in your given database
     * @param {String} databaseName
     * @param {String} collectionName
     * @returns {Promise<Object>}
     */
    createCollectionAsync = async (databaseName, collectionName) => {
        return new Promise((resolve, reject) => {
            this.createCollection(this.connectionString, databaseName, collectionName, (result, err) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    };

    /**
     * Search for an Object by give em an object to match
     * @param {String} databaseName
     * @param {String} collectionName
     * @param {Object} queryObject
     * @param {CallableFunction} callbackFunction
     */
    query = (databaseName, collectionName, queryObject, callbackFunction) => {
        MongoClient.connect(this.connectionString, DRIVER_OPTIONS, (error, db) => {
            if (error) return callbackFunction(false, error);
            var dbf = db.db(databaseName);
            dbf.collection(collectionName)
                .find(queryObject)
                .toArray(function (err, result) {
                    if (err) return callbackFunction(false, err);
                    db.close();
                    if (callbackFunction) callbackFunction(result);
                });
        });
    };

    /**
     * async search for an Object by give em an object to match
     * @param {String} databaseName
     * @param {String} collectionName
     * @param {Object} queryObject
     * @returns {Promise<Object>}
     */
    queryAsync = async (databaseName, collectionName, queryObject) => {
        return new Promise((resolve, reject) => {
            this.query(databaseName, collectionName, queryObject, (result, err) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    };

    /**
     * Insert a new Object to the given Collection
     * @param {String} databaseName
     * @param {String} collectionName
     * @param {Object} onject
     * @param {CallableFunction} callbackFunction
     */
    insertObject = (databaseName, collectionName, object, callbackFunction) => {
        MongoClient.connect(this.connectionString, DRIVER_OPTIONS, (error, db) => {
            if (error) return callbackFunction(false, error);
            var dbf = db.db(databaseName);
            dbf.collection(collectionName).insertOne(object, (err, result) => {
                if (err) return callbackFunction(false, err);
                db.close();
                if (callbackFunction) callbackFunction(true);
            });
        });
    };

    /**
     * Async insert a new Object to the given Collection
     * @param {String} databaseName
     * @param {String} collectionName
     * @param {Object} object
     * @returns {Promise<Object>}
     */
    insertObjectAsync = async (databaseName, collectionName, object) => {
        return new Promise((resolve, reject) => {
            this.insertObject(databaseName, collectionName, object, (result, err) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    };

    /**
     * Delete a queried object
     * @param {String} databaseName
     * @param {String} collectionName
     * @param {Object} queryObject
     * @param {CallableFunction} callbackFunction
     */
    deleteObject = (databaseName, collectionName, queryObject, callbackFunction) => {
        MongoClient.connect(this.connectionString, DRIVER_OPTIONS, (error, db) => {
            if (error) return callbackFunction(false, error);
            var dbf = db.db(databaseName);
            dbf.collection(collectionName).deleteOne(queryObject, function (err, result) {
                if (err) return callbackFunction(false, err);
                db.close();
                if (callbackFunction) callbackFunction(true);
            });
        });
    };

    /**
     * Async delete a queried object
     * @param {String} databaseName
     * @param {String} collectionName
     * @param {Object} queryObject
     * @returns {Promise<Object>}
     */
    deleteObjectAsync = async (databaseName, collectionName, queryObject) => {
        return new Promise((resolve, reject) => {
            this.deleteObject(databaseName, collectionName, queryObject, (result, err) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    };

    /**
     * Update a queried object.. it inserts the given object key value pairs
     * @param {String} databaseName
     * @param {String} collectionName
     * @param {Object} queryObject
     * @param {Object} newValues
     * @param {CallableFunction} callbackFunction
     */
    updateObject = (databaseName, collectionName, queryObject, newValues, callbackFunction) => {
        MongoClient.connect(this.connectionString, DRIVER_OPTIONS, (error, db) => {
            if (error) return callbackFunction(false, error);
            var dbf = db.db(databaseName);
            let obj = {
                $set: newValues,
            };
            dbf.collection(collectionName).updateOne(queryObject, obj, function (err, result) {
                if (err) return callbackFunction(false, err);
                db.close();
                if (callbackFunction) callbackFunction(true);
            });
        });
    };

    /**
     * Async Update a queried object.. it inserts the given object key value pairs
     * @param {String} databaseName
     * @param {String} collectionName
     * @param {Object} queryObject
     * @param {Object} newValues
     * @returns {Promise<Object>}
     */
    updateObjectAsync = async (databaseName, collectionName, queryObject, newValues) => {
        return new Promise((resolve, reject) => {
            this.updateObject(databaseName, collectionName, queryObject, newValues, (result, err) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    };
}

module.exports = MongoDatabaseHandler;
