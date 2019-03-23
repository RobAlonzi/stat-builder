const axios = require('axios');
const Game = require('../db/Game');
const { GAME_URL } = require('../api/nhl');

const main = id => {
    return axios.get(GAME_URL(id)).then(response => scrapeGame(response.data));
}

function scrapeGame(data) {
    const output = {};
    
    // Parse id
    output.id = data.gamePk;

    // Parse meta
    output.meta = {
        dates: data.gameData.datetime,
        game: data.gameData.game,
        status: data.gameData.status,
    };
    
    // Parse coaches
    output.coaches = {
        away: data.liveData.boxscore.teams.away.coaches,
        home: data.liveData.boxscore.teams.home.coaches,
    };

    // Parse teams
    output.teams = {
        away: data.gameData.teams.away.id,
        home: data.gameData.teams.home.id,
    };

    // Parse Plays
    output.plays = data.liveData.plays.allPlays,

    // Parse Stats
    output.stats = {
        teams: {
            away: data.liveData.boxscore.teams.away,
            home: data.liveData.boxscore.teams.home,
        },
        players: {
            away: data.liveData.boxscore.teams.away.players,
            home: data.liveData.boxscore.teams.home.players,
        }
    };

    // Parse Officials
    output.officials = data.liveData.boxscore.officials;

    // Parse Descisions
    output.decisions = {
        winner: data.liveData.decisions.winner.id,
        loser: data.liveData.decisions.loser.id,
        firstStar: data.liveData.decisions.firstStar.id,
        secondStar: data.liveData.decisions.secondStar.id,
        thirdStar: data.liveData.decisions.thirdStar.id,
    };

    // Save it
    return saveData(output);
}


function saveData(data) {
    const game = new Game(data);
    return game.save().then(data => data);
}

module.exports = main;