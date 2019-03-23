const Player = require('../Player');

class Play {
    constructor({ about, coordinates, result, players }, game){
        this.game = game;
        this.about = about;
        this.coordinates = coordinates;
        this.result = result;
        this.players = players;
    }

    async save(){
        // Look for existing play? (Game ID and Event ID)
        const event = await this.find();
        
        // If not found, create
        if(!event) {
            return this.create();
        }


        return new Promise(resolve => {
            setTimeout(() => {
              resolve(this.result.eventTypeId);
            }, 2000);
        });
    }

    find(){
        return null;
    }

    async create(){
        let players = [];

        // Find Players
        if(this.players){
            console.log(this.players);
            for (const player of this.players) {
                const playerId = await new Player(player.player.id).findOrCreate();
                players.push({ 
                    player: playerId,
                    type: player.playerType,
                });
            }

            // Add event to player
        }

        // Do the saving here....
        return new Promise(resolve => {
            setTimeout(() => {
              resolve({
                gameId: this.game,
                players,
                meta: {
                    gameId: this.game,
                    eventId: this.about.eventId,
                    eventIdx: this.about.eventIdx,
                    dateTime: this.about.dateTime,
                },
                period: {
                    number: this.about.period,
                    type: this.about.periodType,
                    time: this.about.periodTime,
                    remaining: this.about.periodTimeRemaining
                },
                coordinates: this.coordinates,
                goals: this.about.goals,
                event: {
                    id: this.result.eventTypeId,
                    name: this.result.event,
                    code: this.result.eventCode,
                    description: this.result.description,
                }
              });
            }, 500);
        });
    }
}

module.exports = Play;