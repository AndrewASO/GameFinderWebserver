"use strict";
/**
 * This is the character sheet that'll go inside of the user's profile class and it contains things like stats, name, race, background
 * , etc. More things that a character sheet should have for DnD.
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharSheet = void 0;
const Spell_1 = require("./Spell");
class CharSheet {
    charName;
    race;
    background;
    backstory;
    lvl;
    charClass;
    //private stats = new Map<string, string>();   //Wait why is this a map/hash again ? I could've just returned an array and we have the naming
    //scheme of it being something like [int, def, atk, etc]
    spells;
    stats;
    equipment;
    inventory;
    languages;
    skills;
    //Need to add a photos[3]
    /**
     *
     * @param charName
     * @param race
     * @param background
     * @param backstory
     * @param lvl
     * @param charClass
     * @param spells
     * @param stats
     * @param equipment
     * @param inventory
     * @param languages
     * @param skills
     */
    constructor(charName, race, background, backstory, lvl, charClass, spells, stats, equipment, inventory, languages, skills) {
        this.charName = charName;
        this.race = race;
        this.background = background;
        this.backstory = backstory;
        this.lvl = lvl;
        this.charClass = charClass;
        this.spells = spells;
        this.stats = stats;
        this.equipment = equipment;
        this.inventory = inventory;
        this.languages = languages;
        this.skills = skills;
    }
    /**
     *
     * @param charName
     * @param race
     * @param background
     * @param backstory
     * @param lvl
     * @param charClass
     * @param spells
     * @param stats
     * @param equipment
     * @param inventory
     * @param languages
     * @param skills
     */
    editInformation(charName, race, background, backstory, lvl, charClass, spells, stats, equipment, inventory, languages, skills) {
        this.charName = charName;
        this.race = race;
        this.background = background;
        this.backstory = backstory;
        this.lvl = lvl;
        this.charClass = charClass;
        this.spells = spells; //This'll prob be null to begin with 
        this.stats = stats;
        this.equipment = equipment;
        this.inventory = inventory;
        this.languages = languages;
        this.skills = skills;
    }
    /**
     * Create spell function so that it's easier to add spells to the character sheet instead of doing
     * it in a jankier way.
     * @param spellName
     * @param castingTime
     * @param range
     * @param duration
     * @param desc
     * @param spellLvl
     * @param school
     * @param components
     * @param materialCost
     * @param races
     * @param reqClasses
     */
    createSpell(spellName, castingTime, range, duration, desc, spellLvl, school, components, materialCost, races, reqClasses) {
        let newSpell = new Spell_1.Spell(spellName, castingTime, range, duration, desc, spellLvl, school, components, materialCost, races, reqClasses);
        this.addSpell(newSpell);
    }
    /**
     * Adds the newly created spell from createSpell() to the spell array in this obj.
     * @param newSpell
     */
    addSpell(newSpell) {
        this.spells.push(newSpell);
    }
    //I could either return everything in a giant array or do something else
    //I can actually do JSON.stringify() to return all of the information in 1 big array, so that'll be preferred 
    //Leave this empty for now and probably isn't worth it tbh
    returnInformation() {
        const returnArray = new Array();
        returnArray.push(this.charName);
        returnArray.push(this.race);
        returnArray.push(this.background);
        returnArray.push(this.backstory);
        returnArray.push(this.lvl);
        returnArray.push(this.charClass);
        returnArray.push(this.stats);
        returnArray.push(this.spells);
        returnArray.push(this.equipment);
        returnArray.push(this.inventory);
        returnArray.push(this.languages);
        returnArray.push(this.skills);
        return returnArray;
    }
}
exports.CharSheet = CharSheet;
