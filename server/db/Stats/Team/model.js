const mongoose = require('mongoose');

const TeamStatModel = new mongoose.Schema({
    teamId: { type: Number },
    gameId: { type: Number },
    goals: { type: Number },
    shots: { type: Number },
    hits: { type: Number },
    blockedShots: { type: Number },
    pim: { type: Number },
    takeaways: { type: Number },
    giveaways: { type: Number },
    ppg: { type: Number },
    ppPct: { type: String },
    ppOpp: { type: Number },
    faceoffPct: { type: String },
});

mongoose.model('Official', TeamStatModel);
  