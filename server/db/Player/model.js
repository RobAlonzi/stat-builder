const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerModel = new Schema({
    nhlId: { type: Number },
    firstName: { type: String },
    lastName: { type: String },
    number: { type: Number },
    dob: { type: String },
    city: { type: String },
    region: { type: String },
    country: { type: String },
    nationality: { type: String },
    height: { type: String },
    weight: { type: Number },
    handedness: { type: String },
    team: { type: Number },
    position: { type: Schema.Types.ObjectId, ref: 'Position' },
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    games: [{
        "_id": false,
        id: { type: Number },
        stats: { type: Schema.Types.ObjectId, ref: 'PlayerStat' },
        number: { type: Number },
        position: { type: Schema.Types.ObjectId, ref: 'Position' }
    }],
});

mongoose.model('Player', PlayerModel);
  