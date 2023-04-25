"use strict";
/**
 *
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const CharSheet_1 = require("./CharSheet");
//const {MongoClient} = require('mongodb');   //This is needed to get MongoClient to start working for whatever reaso
class Profile {
    //Need to have a token so that the profiles can be more secure
    displayName;
    username;
    password;
    permissionLvl;
    blockedProfiles = new Array();
    friends = new Array();
    charSheets = null;
    db;
    constructor(...arr) {
        if (arr.length == 4) {
            this.displayName = arr[0];
            this.username = arr[1];
            this.password = arr[2];
            this.db = arr[3];
            this.permissionLvl = 0;
            this.saveToDB();
        }
        else {
            this.username = arr[0];
            this.password = arr[1];
            this.db = arr[2];
            this.getUserDBInfo();
        }
    }
    async saveToDB() {
        let collection = this.db.returnCollection("ProfilesDB", "Profiles");
        collection.insertOne({ "Username": this.username, "Password": this.password, "PermissionLevel": this.permissionLvl,
            "CharacterSheets": this.charSheets, "DisplayName": this.displayName, "BlockedProfiles": this.blockedProfiles,
            "Friends": this.friends });
    }
    /**
     *
     */
    async getUserDBInfo() {
        let collection = this.db.returnCollection("ProfilesDB", "Profiles");
        const doc = await collection.findOne({ Username: this.username });
        this.displayName = doc.DisplayName;
        //console.log( this.displayName );
        //console.log( doc.DisplayName );
        this.permissionLvl = doc.PermissionLevel;
        this.charSheets = JSON.parse(doc.CharacterSheets);
        this.blockedProfiles = doc.BlockedProfiles;
        this.friends = doc.Friends;
    }
    //For profiles would I have it be something like calling the profile, then looking at the different character sheets
    //and going from that or should I just call the character sheets and have spells modified from that ?
    createCharSheet(charName, race, background, backstory, lvl, charClass, stats, equipment, inventory, languages, skills) {
        let newSheet = new CharSheet_1.CharSheet(charName, race, background, backstory, lvl, charClass, null, stats, equipment, inventory, languages, skills);
        this.addCharacterSheet(newSheet);
    }
    addCharacterSheet(newSheet) {
        this.charSheets.push(newSheet);
    }
    setMongoDB() {
        this.db = null;
    }
    returnDisplayName() {
        return this.displayName;
    }
    returnUsername() {
        return this.username;
    }
    returnPassword() {
        return this.password;
    }
}
exports.Profile = Profile;
