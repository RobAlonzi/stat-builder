const mongoose = require('mongoose');

const OfficialModel = new mongoose.Schema({
    type: { type: String },
    nhlId: { type: Number },
    firstName: { type: String },
    lastName: { type: String },
    number: { type: Number },
    city: { type: String },
    region: { type: String },
    country: { type: String },
    games: [Number],
});

OfficialModel.set('toJSON', { getters: true, virtuals: false });
mongoose.model('Official', OfficialModel);
  