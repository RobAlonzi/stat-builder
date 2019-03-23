const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoachModel = new Schema({
    name: { type: String },
    position: { type: Schema.Types.ObjectId, ref: 'Position' },
    games: [{
        "_id": false,
        id: { type: Number },
        position: { type: Schema.Types.ObjectId, ref: 'Position' }
    }],
});

mongoose.model('Coach', CoachModel);