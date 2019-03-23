var mongoose = require('mongoose');
const Position = mongoose.model('Position');

class PositionClass {
    constructor(data){
        this.code = data.code;
        this.name = data.name;
        this.type = data.type;
        this.abbreviation = data.abbreviation;
    }

    async findOrCreate(){
        // Look for existing play? (Game ID and Event ID)
        const position = await this.find();
        
        // If not found, create
        if(!position) {
            return this.create();
        }


        return position;
    }

    async find(){
        const position = await Position.findOne(
            { 'code': this.code }
        );

        if (!position) {
            return null;
        }

        return position._id;
    }

    async create(){
        const position = {
            code: this.code,
            name: this.name,
            type: this.type,
            abbreviation: this.abbreviation,
        }

        // Uploaded to DB
        try {
            const result = await Position.create(position);
            return result._id;
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = PositionClass;