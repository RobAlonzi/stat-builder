const axios = require('axios');
const mongoose = require('mongoose');

const Position = require('../Position');
const Team = require('../Team');
const { PLAYER_URL } = require('../../api/nhl');

const Player = mongoose.model('Player');


class PlayerClass {
    constructor(id){
        this.id = id;
    }

    async findOrCreate(){
        // Look for existing play? (Game ID and Event ID)
        const player = await this.find();
        
        // If not found, create
        if(!player) {
            return this.create();
        }


        return player;
    }

    async find(){
        const player = await Player.findOne(
            { 'nhlId': this.id }
        );
        
        console.log(player);
        if (!player) {
            return null;
        }

        return player._id;
    }

    async create(){

        // Fetch player profile
        const data = await axios.get(PLAYER_URL(this.id)).then(response => response.data.people[0]);

        // Create or Fetch Position
        const position = await new Position(data.primaryPosition).findOrCreate();

        // Create or Fetch Team
        const team = await new Team(data.currentTeam.id).findOrCreate();

        const player = {
            nhlId: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            number: data.primaryNumber,
            dob: data.birthDate,
            city: data.birthCity,
            region: data.birthStateProvince,
            country: data.birthCountry,
            nationality: data.nationality,
            height: data.height,
            weight: data.weight,
            handedness: data.shootsCatches,
            team,
            position,
        }

        // Uploaded to DB
        try {
            const result = await Player.create(player);
            return result._id;
        } catch (err) {
            throw new Error(err);
        }
    }

    // TODO
    async addEventToPlayer(){

    }

    // TODO
    async addStatLineToPlayer(){
        
    }
}

module.exports = PlayerClass;