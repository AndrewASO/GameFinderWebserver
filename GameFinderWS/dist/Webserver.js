"use strict";
/**
 *
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const ProfilesManagement_1 = require("./ProfilesManagement");
const mongoDB_1 = require("./mongoDB"); //To remove after testing
const express_1 = __importDefault(require("express"));
//https://www.kindacode.com/snippet/node-js-express-typescript-req-query-type/
async function startServer() {
    const server = (0, express_1.default)();
    const db = new mongoDB_1.MongoDB("mongodb+srv://gameFinder:ASUq%23%2AAIwq%29@gamefinder.2rj5gki.mongodb.net/?retryWrites=true&w=majority");
    const profileManagement = new ProfilesManagement_1.ProfileManagement(db);
    server.get('/SignIn', async (req, res) => {
        const displayName = req.query.DisplayName;
        const username = req.query.Username;
        const pw = req.query.Password;
        const msg = await profileManagement.signIn(displayName, username, pw);
        res.send(msg);
    });
    server.get('/Login', async (req, res) => {
        const username = req.query.Username;
        const pw = req.query.Password;
        const msg = await profileManagement.login(username, pw);
        res.send(msg);
    });
    server.get('/ReturnProfileInformation', async (req, res) => {
        const username = req.query.Username;
        const msg = await profileManagement.accessUser(username);
        let JSONConversion = JSON.stringify(msg);
        console.log(JSONConversion);
        res.send(JSON.stringify(msg));
        //res.send( "Is this working correctly ???");
    });
    //I need username and charName for a characterSheet to be added and then pulling up the characterSheet and adding a spell to it 
    //Need to be able to change characterSheet & spell information incase of typos
    //Need to be able to change profile information
    server.listen(3000);
}
exports.startServer = startServer;
/**
 * I need the requests of
 * -Logging in  -DONE
 * -Signing in  -DONE
 * -Creating Character Sheets -TODO, this should be based on the characterSheet token or charName
 * -Creating Spells -TODO, -should be based on the characterSheet token / charName
 * -Getting profile information -DONE
 */ 
