const mongoose = require('mongoose');
const axios = require('axios');
const OFFICIAL_URL = require('../../api/nhl').OFFICIAL_URL;
const Official = mongoose.model('Official');

class OfficialClass {
    constructor(data, gameId){
        this.id = data.official.id
        this.game = gameId;
    }

    async findOrCreate(){
        // Look for existing play? (Game ID and Event ID)
        const official = await this.find();
        
        // If not found, create
        if(!official) {
            return this.create();
        }

        return official;
    }

    async find(){
        const official = await Official.findOneAndUpdate(
            { 'nhlId': this.id },
            { '$addToSet': { 'games': this.game }}
        );

        if (!official) {
            return null;
        }

        return official.nhlId;
    }

    async create(){
        // Fetch player profile
        const data = await axios.get(OFFICIAL_URL(this.id)).then(response => response.data.data[0]);

        const official = {
            nhlId: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            number: data.sweaterNumber,
            city: data.birthCity,
            region: data.stateProvinceCode,
            country: data.countryCode,
            type: data.officialType,
            games: [this.game],
        }

        // Uploaded to DB
        try {
            const result = await Official.create(official);
            return result.nhlId;
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = OfficialClass;