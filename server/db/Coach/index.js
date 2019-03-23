const mongoose = require('mongoose');

const Position = require('../Position');
const Coach = mongoose.model('Coach');

class CoachClass {
    constructor(person, position, game){
        this.name = person.fullName;
        this.position = position;
        this.game = game;
    }

    async findOrCreate(){
        // Find or create position
        await this.findPosition();

        // Look for existing play? (Game ID and Event ID)
        const coach = await this.find();
        
        // If not found, create
        if(!coach) {
            return this.create();
        }


        return coach;
    }

    async findPosition() {
        // Uploaded to DB
        try {
            const position = await new Position(this.position).findOrCreate();
            this.position.id = position;
        } catch (err) {
            throw new Error(err);
        }
    }

    async find(){
        const game = {
            id: this.game,
            position: this.position.id
        }

        const coach = await Coach.findOneAndUpdate(
            { 'name': this.name },
            { '$addToSet': { 'games': game }}
        );
        
        console.log(this.game);
        console.log(coach);
        if (!coach) {
            return null;
        }

        return { id: coach._id, position: this.position.id };
    }

    async create(){
        // Fetch player profile
        const coach = {
            name: this.name,
            position: this.position.id,
            games: [{
                id: this.game,
                position: this.position.id,
            }]
        }

        // Uploaded to DB
        try {
            const result = await Coach.create(coach);
            return { id: result._id, position: this.position.id };
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = CoachClass;