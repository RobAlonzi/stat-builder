const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
} = graphql;


const MetaType = require('./Meta');
const CoachesType = require('./Coaches');
const TeamsType = require('./Teams');
const PlaysType = require('./Plays');
const GameStatsType = require('./GameStats');
const OfficialsType = require('./Officials');
const DecisionsType = require('./Decisions');


const GameType = new GraphQLObjectType({
    name: 'Game',
    fields: {
        id: {
            type: GraphQLInt,
            resolve(parentValue){
                return parentValue.gamePk
            }
        },
        meta: {
            type: MetaType,
            resolve(parentValue){
                return { 
                    dates: parentValue.gameData.datetime,
                    game: parentValue.gameData.game,
                    status: parentValue.gameData.status,
                }
            }
        },
        coaches: {
            type: CoachesType,
            resolve(parentValue){
                return { 
                    away: parentValue.liveData.boxscore.teams.away.coaches,
                    home: parentValue.liveData.boxscore.teams.home.coaches,
                }
            }
        },
        teams: {
            type: TeamsType,
            resolve(parentValue){
                return { 
                    away: parentValue.gameData.teams.away.id,
                    home: parentValue.gameData.teams.home.id,
                }
            }
        },
        plays:{
            type: PlaysType,
            resolve(parentValue){
                return { 
                    all: parentValue.liveData.plays.allPlays,
                    scoring: parentValue.liveData.plays.scoringPlays,
                    penalty: parentValue.liveData.plays.penaltyPlays,
                }
            }
        },
        stats:{
            type: GameStatsType,
            resolve(parentValue){
                return {
                    teams: {
                        away: parentValue.liveData.boxscore.teams.away,
                        home: parentValue.liveData.boxscore.teams.home,
                    },
                    players: {
                        away: parentValue.liveData.boxscore.teams.away.players,
                        home: parentValue.liveData.boxscore.teams.home.players,
                    }
                }
            }
        },
        officials: {
            type: new GraphQLList(OfficialsType),
            resolve(parentValue){
                return parentValue.liveData.boxscore.officials
            }
        },
        decisions: {
            type: DecisionsType,
            resolve(parentValue){
                return { 
                    winner: parentValue.liveData.decisions.winner.id,
                    loser: parentValue.liveData.decisions.loser.id,
                    firstStar: parentValue.liveData.decisions.firstStar.id,
                    secondStar: parentValue.liveData.decisions.secondStar.id,
                    thirdStar: parentValue.liveData.decisions.thirdStar.id,
                }
            }
        }
    }
});

module.exports = GameType;