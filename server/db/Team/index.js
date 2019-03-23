const mongoose = require('mongoose');
const axios = require('axios');

const TEAM_URL = require('../../api/nhl').TEAM_URL;
const Team = mongoose.model('Team');

class TeamClass {
    constructor(id, game){
        this.id = id;
        this.game = game;
    }

    async findOrCreate(){
        // Look for existing team
        const team = await this.find();
        
        // If not found, create
        if(!team) {
            return this.create();
        }

        return team;
    }

    async find(){
        const team = await Team.findOneAndUpdate(
            { 'nhlId': this.id },
            { '$addToSet': { 'games': this.game }}
        );

        if (!team) {
            return null;
        }

        return team.nhlId;
    }

    async create(){
        // Fetch team profile
        const data = await axios.get(TEAM_URL(this.id)).then(response => response.data.teams[0]);

        const team = {
            nhlId: data.id,
            teamName: data.teamName,
            locationName: data.locationName,
            abbreviation: data.abbreviation,
            shortName: data.shortName,
            games: [this.game],
        }

        // Uploaded to DB
        try {
            const result = await Team.create(team);
            return result.nhlId;
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = TeamClass;