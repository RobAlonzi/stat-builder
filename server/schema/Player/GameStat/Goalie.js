const axios = require('axios');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat } = graphql;

const PlayerType = require('../../Player');

const GoalieGameStat = new GraphQLObjectType({
    name: 'GoalieGameStat',
    fields: {
        toi: {
            type: GraphQLString,
            resolve(parentValue) {
                return parentValue.timeOnIce;
            }
        },
        assists: {
            type: GraphQLInt,
        },
        goals: {
            type: GraphQLInt,
        },
        pim: {
            type: GraphQLInt,
            resolve(parentValue) {
                return parentValue.penaltyMinutes;
            }
        },
        shots: {
            type: GraphQLInt,
        },
        saves: {
            type: GraphQLInt,
        },
        ppSaves: {
            type: GraphQLInt,
            resolve(parentValue) {
                return parentValue.powerPlaySaves;
            }
        },
        ppShots: {
            type: GraphQLInt,
            resolve(parentValue) {
                return parentValue.powerPlayShotsAgainst;
            }
        },
        shSaves: {
            type: GraphQLInt,
            resolve(parentValue) {
                return parentValue.shortHandedSaves;
            }
        },
        shShots: {
            type: GraphQLInt,
            resolve(parentValue) {
                return parentValue.shortHandedShotsAgainst;
            }
        },
        evSaves: {
            type: GraphQLInt,
            resolve(parentValue) {
                return parentValue.evenSaves;
            }
        },
        evShots: {
            type: GraphQLInt,
            resolve(parentValue) {
                return parentValue.evenShotsAgainst;
            }
        },
        decision: {
            type: GraphQLString,
        },
        svPct: {
            type: GraphQLFloat,
            resolve(parentValue) {
                return parentValue.savePercentage;
            }
        },
        ppSvPct: {
            type: GraphQLFloat,
            resolve(parentValue) {
                return parentValue.powerPlaySavePercentage;
            }
        },
        evSvPct: {
            type: GraphQLFloat,
            resolve(parentValue) {
                return parentValue.evenStrengthSavePercentage;
            }
        },
    }
});

const GoalieGameStatContainer = new GraphQLObjectType({
    name: 'GoalieGameStatContainer',
    fields: {
        player: {
            type: PlayerType,
            resolve(parentValue) {
                return axios.get(`https://statsapi.web.nhl.com/api/v1/people/${parentValue.person.id}`).then(response => response.data.people[0])
            }
        },
        stats: {
            type: GoalieGameStat,
            resolve(parentValue) {
                return parentValue.stats.goalieStats;
            }
        },
    }
});

module.exports = GoalieGameStatContainer;