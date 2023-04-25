"use strict";
/**
 * I don't even know what this was created for tbh
 * I think it was just storing all of the different races, equipment, classes, spells, etc for the
 * user to access whenever they wanted to ???
 * @Author Andrew Skevington-Olivera
 * @Date 20-4-23
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoStorage = void 0;
//Honestly I think this was for storing all of the different stuff needed in MongoDB
//But I'll leave this here for now and not work on it until its needed which will probably be needed as
//soon as I get the server up & running
class InfoStorage {
    db;
    constructor(db) {
        this.db = db;
    }
}
exports.InfoStorage = InfoStorage;
