const Meta = require('./Meta');
const Team = require('../Team');
const Player = require('../Player');
const Play = require('../Play');
const Coach = require('../Coach');
const Official = require('../Official');
const Position = require('../Position');
const TeamStat = require('../Stats/Team');
const SkaterStat = require('../Stats/Game/Skater');
const GoalieStat = require('../Stats/Game/Goalie');

class Game {
    constructor(data){
        this.id = data.id;
        this.meta = data.meta;
        this.coaches = data.coaches;
        this.teams = data.teams;
        this.plays = data.plays;
        this.stats = data.stats;
        this.officials = data.officials;
        this.decisions = data.decisions;
    }

    save(){
        const promises = [];

        // Save Coaches
        // promises.push(this.__saveCoaches());

        // // Save Officials
        // promises.push(this.__saveOfficials());

        // // Save Teams
        // promises.push(this.__saveTeams());

        // Save Plays
        promises.push(this.__savePlays());

        // // Save Stats
        // promises.push(this.__saveTeamStats());
        // promises.push(this.__savePlayerStats());

        // // Save Descisions
        // promises.push(this.__saveDescisions());

        // Save Game
        return Promise.all(promises).then((data) => {
            const [
                coaches,
                officials,
                teams,
                plays,
                teamStats,
                playerStats,
                descisions
            ] = data;

            return {
                coaches,
                officials,
                teams,
                plays,
                teamStats,
                playerStats,
                descisions
            }
        });
    }

    // PLAYS
    __savePlays(){
        const promises = [];

        // Saving individual plays
        this.plays.forEach(play => promises.push(
            new Play(play, this.id).save()
        ));

        return Promise.all(promises);
    }

    // STATS
    __savePlayerStats(){
        const promises = [];
        const output = {
            away: [],
            home: [],
        };

        Object.values(this.stats.players.away).forEach(player => promises.push(__savePlayerStat(player, new Meta({
            itemId: player.person.id,
            gameId: this.id,
            side: 'away',
            jerseyNumber: player.jerseyNumber,
        }).getDetails())));

        Object.values(this.stats.players.home).forEach(player => promises.push(__savePlayerStat(player, new Meta({
            itemId: player.person.id,
            gameId: this.id,
            side: 'home',
            jerseyNumber: player.jerseyNumber,
        }).getDetails())));

        return Promise.all(promises).then(data => {
            data.forEach(stat => {
                output[stat.meta.side].push(stat);
            });

            return output;
        })
    }

    __saveTeamStats(){
        const promises = [];

        promises.push(
            new TeamStat(
                this.stats.teams.away.teamStats.teamSkaterStats,
                this.stats.teams.away.team.id,
                this.id,
            ).save()
        );
        
        promises.push(
            new TeamStat(
                this.stats.teams.home.teamStats.teamSkaterStats,
                this.stats.teams.home.team.id,
                this.id,
            ).save()
        );

        return Promise.all(promises).then(data => ({
            away: data[0],
            home: data[1]
        }));
    }

    // COACHES
    __saveCoaches(){
        const promises = {
            away: [],
            home: [],
        };

        // Saving individual coaches
        this.coaches.away.forEach(coach => promises.away.push(new Coach(coach.person, coach.position, this.id).findOrCreate()));
        this.coaches.home.forEach(coach => promises.home.push(new Coach(coach.person, coach.position, this.id).findOrCreate()));

        return Promise.all(Object.values(promises).map(promise => Promise.all(promise))).then(data => ({
            away: data[0],
            home: data[1]
        }));
    }

    // OFFICIALS
    __saveOfficials(){
        const promises = [];

        // Saving individual officials
        this.officials.forEach(official => {
            const person = new Official(official, this.id);
            promises.push(person.findOrCreate());
        });

        return Promise.all(promises).then(data => data);
    }

    // TEAMS
    __saveTeams(){
        const promises = [];

        // Saving individual teams
        promises.push(new Team(this.teams.away, this.id).findOrCreate());
        promises.push(new Team(this.teams.home, this.id).findOrCreate());

        return Promise.all(promises).then(data => {
            const [away, home] = data;

            return {
                away,
                home,
            }
        });
    }

    // DESCISIONS
    __saveDescisions(){
        const promises = [];

        // Saving individual teams
        promises.push(new Player(this.decisions.winner).findOrCreate());
        promises.push(new Player(this.decisions.loser).findOrCreate());
        promises.push(new Player(this.decisions.firstStar).findOrCreate());
        promises.push(new Player(this.decisions.secondStar).findOrCreate());
        promises.push(new Player(this.decisions.thirdStar).findOrCreate());

        return Promise.all(promises).then(data => {
            const [winner, loser, firstStar, secondStar, thirdStar] = data;

            return {
                winner,
                loser,
                firstStar,
                secondStar,
                thirdStar
            }
        });
    }
}

// HELPER FUNCTIONS
async function __savePlayerStat(player, meta){

    if(player.stats.goalieStats){
        return await new GoalieStat({...player, meta}).save();
    }
    
    return await new SkaterStat({...player, meta}).save();
}

module.exports = Game;