const mongoose = require('mongoose');

const PositionModel = new mongoose.Schema({
    abbreviation: { type: String },
    code: { type: String },
    name: { type: String },
    type: { type: String },
});

mongoose.model('Position', PositionModel);