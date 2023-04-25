"use strict";
/**
 * This is for managing all of the MongoDB information that needs to be sent / requested from it.
 * Has the ability of connecting of it, returningDoc / Collections, and updating the documents as well
 * as getting the variables from a document with the username requested.
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDB = void 0;
const { MongoClient } = require('mongodb');
class MongoDB {
    mongoClient = MongoClient;
    constructor(uri) {
        this.mongoClient = new MongoClient(uri);
    }
    /**
     * Connects to MongoDB server
     */
    async connect() {
        await this.mongoClient.connect();
    }
    /**
     * Returns the Mongo collection of the database with the collectionName.
     * @param database
     * @param collectionName
     * @returns
     */
    returnCollection(database, collectionName) {
        const db = this.mongoClient.db(database);
        return db.collection(collectionName);
    }
    /**
     * Returns the doc with the username of the requested doc from collection.
     * @param database
     * @param collectionName
     * @param username
     * @returns
     */
    async ReturnDoc(database, collectionName, username) {
        const collection = this.returnCollection(database, collectionName);
        const doc = await collection.findOne({ "Username": username });
        return doc;
    }
    /**
     *
     * @returns mongoClient
     */
    returnMongoClient() {
        return this.mongoClient;
    }
    updateDB(database, collectionName, username, field, updatedVar) {
        const collection = this.returnCollection(database, collectionName);
        collection.updateOne({ Username: username }, { $set: { [field]: updatedVar } });
    }
    //Had Promise<void>
    async getVar(database, collectionName, username, field) {
        const collection = this.returnCollection(database, collectionName);
        const doc = await collection.findOne({ "Username": username });
        return doc[field];
    }
}
exports.MongoDB = MongoDB;
