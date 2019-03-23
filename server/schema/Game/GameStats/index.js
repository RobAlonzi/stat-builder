const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList } = graphql;

const PlayerGameStatType = require('../../Player/GameStat');
const TeamGameStatType = require('../../Team/GameStat');

// Custom Types
const PlayerGameStatsType  = new GraphQLObjectType({
    name: 'PlayerGameStats',
    fields: {
        away: {
            type: new GraphQLList(PlayerGameStatType),
            resolve(parentValue){
                return Object.values(parentValue.away);
            }
        },
        home: {
            type: new GraphQLList(PlayerGameStatType),
            resolve(parentValue){
                return Object.values(parentValue.home);
            }
        },
    }
});

const TeamGameStatsType  = new GraphQLObjectType({
    name: 'TeamGameStats',
    fields: {
        away: {
            type: TeamGameStatType,
            resolve(parentValue){
                return {
                    id: parentValue.away.team.id,
                    stats: parentValue.away.teamStats.teamSkaterStats
                }
            }
        },
        home: {
            type: TeamGameStatType,
            resolve(parentValue){
                return {
                    id: parentValue.home.team.id,
                    stats: parentValue.home.teamStats.teamSkaterStats
                }
            }
        },
    }
});


const GameStatsType = new GraphQLObjectType({
    name: 'GameStats',
    fields: {
        players: {
            type: PlayerGameStatsType,
        },
        teams: {
            type: TeamGameStatsType,
        },
    }
});

module.exports = GameStatsType;