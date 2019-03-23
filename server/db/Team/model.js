const mongoose = require('mongoose');

const TeamModel = new mongoose.Schema({
    nhlId: { type: Number },
    teamName: { type: String },
    locationName: { type: String },
    abbreviation: { type: String },
    shortName: { type: String },
    games: [Number],
});

TeamModel.virtual('name').get(() => `${this.locationName} ${this.teamName}`);
mongoose.model('Team', TeamModel);
  