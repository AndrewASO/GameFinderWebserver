"use strict";
/**
 *
 * @Author Andrew Skevington-Olivera
 * @Date 20-4-23
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Webserver = __importStar(require("./Webserver"));
const mongoDB_1 = require("./mongoDB"); //To remove after testing
const ProfilesManagement_1 = require("./ProfilesManagement"); //This should be removed later after testing
const Spell_1 = require("./Spell"); //This should be removed later after testing
//Got the mongoDB library from this link https://www.npmjs.com/package/mongodb
//https://www.tutorialspoint.com/how-to-retrieve-all-the-documents-from-a-mongodb-collection-using-java#:~:text=Connect%20to%20a%20database%20using,invoking%20the%20find()%20method.
//https://www.mongodb.com/docs/manual/reference/method/cursor.forEach/
//https://www.mongodb.com/docs/manual/reference/method/cursor.map/
let uri = "mongodb+srv://gameFinder:ASUq%23%2AAIwq%29@gamefinder.2rj5gki.mongodb.net/?retryWrites=true&w=majority";
//Promise<void>
let database = new mongoDB_1.MongoDB(uri);
database.connect();
//When is Promise<void> needed ? Dunno need to test further 
async function printUsername() {
    const collection = database.returnCollection("ProfilesDB", "Profiles");
    const doc = await collection.findOne({ Username: "TestingOne" });
    if (doc != null) {
        //console.log( doc );
        console.log(doc.Username);
    }
    else {
        console.log("The username provided isn't correct. Please try again");
    }
}
//printUsername();
console.log("We've gotten through all of that :D ");
function test() {
    let profilesManagement = new ProfilesManagement_1.ProfileManagement(database);
    console.log(profilesManagement.signIn("TestingOne", "TestingOne", "!Testing"));
}
//test();
//const testReturnVar = database.getVar( "ProfilesDB", "Profiles", "TestingOne", "Username");
//console.log( testReturnVar );
//database.updateDB( "ProfilesDB", "Profiles", "TestingOne", "DisplayName", "TheThingWorks" );
//const testingJSON = JSON.stringify(Webserver);
//console.log( testingJSON );
let newSpell = new Spell_1.Spell("Fireball", "5s", "500m", "5s", "This shoots a fireball at any enemies", "1", null, null, null, null, null);
let newSpell2 = new Spell_1.Spell("Fireball", "5s", "500m", "5s", "This shoots a fireball at any enemies", "1", ["Fire"], null, null, null, null);
//console.log( JSON.stringify(newSpell) );
const spellArray = new Array();
spellArray.push(newSpell);
spellArray.push(newSpell2);
//database.updateDB( "ProfilesDB", "Profiles", "TestingOne", "Spells", JSON.stringify(spellArray) );
//let newCharSheet = new CharSheet( "Bob", "Human", "Was a builder in a previous life", "Idk something something something", "50", 
//"Builder", spellArray, null as any, null as any, null as any, null as any, null as any);
//database.updateDB( "ProfilesDB", "Profiles", "TestingOne", "CharacterSheets", JSON.stringify(newCharSheet) );
Webserver.startServer();
