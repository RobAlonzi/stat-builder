const axios = require('axios');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat } = graphql;

const PlayerType = require('../../Player');

const SkaterGameStat = new GraphQLObjectType({
    name: 'SkaterGameStat',
    fields: {
        toi: {
            type: GraphQLString,
            resolve(parentValue) {
                return parentValue.timeOnIce;
            }
        },
        evToi: {
            type: GraphQLString,
            resolve(parentValue) {
                return parentValue.evenTimeOnIce;
            }
        },
        ppToi: {
            type: GraphQLString,
            resolve(parentValue) {
                return parentValue.powerPlayTimeOnIce;
            }
        },
        shToi: {
            type: GraphQLString,
            resolve(parentValue) {
                return parentValue.shortHandedTimeOnIce;
            }
        },
        assists: {
            type: GraphQLInt,
        },
        goals: {
            type: GraphQLInt,
        },
        shots: {
            type: GraphQLInt,
        },
        hits: {
            type: GraphQLInt,
        },
        ppGoals: {
            type: GraphQLInt,
            resolve(parentValue) {
                return parentValue.powerPlayGoals;
            }
        },
        ppAssists: {
            type: GraphQLInt,
            resolve(parentValue) {
                return parentValue.powerPlayAssists;
            }
        },
        pim: {
            type: GraphQLInt,
            resolve(parentValue) {
                return parentValue.penaltyMinutes;
            }
        },
        faceoffPct: {
            type: GraphQLFloat,
            resolve(parentValue) {
                return parentValue.faceOffPct;
            }
        },
        faceoffWins: {
            type: GraphQLInt,
            resolve(parentValue) {
                return parentValue.faceOffWins;
            }
        },
        faceoffTaken: {
            type: GraphQLInt,
        },
        takeaways: {
            type: GraphQLInt,
        },
        giveaways: {
            type: GraphQLInt,
        },
        shGoals: {
            type: GraphQLInt,
            resolve(parentValue) {
                return parentValue.shortHandedGoals;
            }
        },
        shAssists: {
            type: GraphQLInt,
            resolve(parentValue) {
                return parentValue.shortHandedAssists;
            }
        },
        blocks: {
            type: GraphQLInt,
            resolve(parentValue) {
                return parentValue.blocked;
            }
        },
        plusMinus: {
            type: GraphQLInt,
        },
    }
});

const SkaterGameStatContainer = new GraphQLObjectType({
    name: 'SkaterGameStatContainer',
    fields: {
        player: {
            type: PlayerType,
            resolve(parentValue) {
                return axios.get(`https://statsapi.web.nhl.com/api/v1/people/${parentValue.person.id}`).then(response => response.data.people[0])
            }
        },
        stats: {
            type: SkaterGameStat,
            resolve(parentValue) {
                return parentValue.stats.skaterStats;
            }
        },
    }
});

module.exports = SkaterGameStatContainer;