const mongoose = require('mongoose');
const axios = require('axios');

const Team = require('../../Team');
const TEAM_URL = require('../../../api/nhl').TEAM_URL;
// const TeamStat = mongoose.model('TeamStat');

class TeamStatsClass {
    constructor(stats, team, game){
        this.stats = stats;
        this.team = team;
        this.game = game;
    }

    async save(){
        // Look for existing team
        const stat = await this.find();
        
        // If not found, create
        if(!stat) {
            return this.create();
        }

        return stat;
    }

    async find(){
        // const team = await Team.findOneAndUpdate(
        //     { 'nhlId': this.id },
        //     { '$addToSet': { 'games': this.game }}
        // );

        // if (!team) {
        //     return null;
        // }

        // return team.nhlId;
        return null;
    }

    async create(){
        // Fetch team profile
        const team = await new Team(this.team, this.game).findOrCreate();

        console.log(team);
        console.log(this.stats);

        const stat = {
            
        }

        // Uploaded to DB
        // try {
        //     const result = await Team.create(team);
        //     return result.nhlId;
        // } catch (err) {
        //     throw new Error(err);
        // }
    }
}

module.exports = TeamStatsClass;