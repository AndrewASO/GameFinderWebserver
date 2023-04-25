"use strict";
/**
 *
 * @Author Andrew SKevington-Olivera
 * 19-4-23
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileManagement = void 0;
//import * as DB from "./mongoDB";
const Profile_1 = require("./Profile");
//const {MongoClient} = require('mongodb');   //This is needed to get MongoClient to start working for whatever reason
class ProfileManagement {
    profileList = new Array();
    db;
    /**
     *
     * @param db
     */
    constructor(db) {
        this.db = db;
        this.initialize();
    }
    /**
     *
     */
    async initialize() {
        const collection = this.db.returnCollection("ProfilesDB", "Profiles");
        var usernameList = new Array();
        var pwList = new Array();
        await collection.find().forEach(function (myDoc) { usernameList.push(myDoc.Username); });
        await collection.find().forEach(function (myDoc) { pwList.push(myDoc.Password); });
        for (var i = 0; i < usernameList.length; i++) {
            let oldProfile = new Profile_1.Profile(usernameList[i], pwList[i], this.db);
            this.addProfile(oldProfile);
        }
    }
    /**
     *
     * @param displayName
     * @param username
     * @param password
     * @returns
     */
    async signIn(displayName, username, password) {
        const collection = this.db.returnCollection("ProfilesDB", "Profiles");
        const doc = await collection.findOne({ Username: username });
        if (doc == null) { //Username hasn't been chosen yet for the website
            let newProfile = new Profile_1.Profile(displayName, username, password, this.db);
            this.addProfile(newProfile);
            console.log("A new profile should be in the process of being created");
            return true;
        }
        console.log("The username was already being taken");
        return false; //The username is already taken
    }
    async login(username, password) {
        const collection = this.db.returnCollection("ProfilesDB", "Profiles");
        const doc = await collection.findOne({ Username: username });
        if (doc != null) {
            if (password === doc.Password) {
                return true; //Information was correct.
            }
            else {
                return false; //Password wasn't correct. User should try to enter their login information again.
            }
        }
        else {
            return false; //Username wasn't in the database. User should try to enter their login information again.
        }
    }
    addProfile(profile) {
        this.profileList.push(profile);
    }
    async accessUser(username) {
        for (var i = 0; i < this.profileList.length; i++) {
            if (username == this.profileList[i].returnUsername()) {
                let copyProfile = this.profileList[i];
                copyProfile.setMongoDB();
                return JSON.stringify(copyProfile);
            }
        }
    }
}
exports.ProfileManagement = ProfileManagement;
