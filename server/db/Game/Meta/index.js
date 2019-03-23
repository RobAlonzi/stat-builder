class Meta {
    constructor({ gameId, side, itemId, jerseyNumber}){
        this.gameId = gameId;
        this.itemId = itemId;
        this.side = side;
        this.jerseyNumber = jerseyNumber;
    }

    getDetails(){
        const output = {
            gameId: this.gameId,
        };

        if (this.itemId) {
            output.itemId = this.itemId;
        }

        if (this.side) {
            output.side = this.side;
        }

        if (this.jerseyNumber) {
            output.jerseyNumber = this.jerseyNumber;
        }

        return output;
    }
}

module.exports = Meta;