const axios = require('axios');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat } = graphql;

const TeamType = require('./index');

const TeamGameStatType = new GraphQLObjectType({
    name: 'TeamGameStat',
    fields: {
        goals: {
            type: GraphQLInt,
        },
        pim: {
            type: GraphQLInt,
        },
        shots: {
            type: GraphQLInt,
        },
        ppPct: {
            type: GraphQLString,
            resolve(parentValue) {
                return parentValue.powerPlayPercentage;
            }
        },
        ppGoals: {
            type: GraphQLInt,
            resolve(parentValue) {
                return parentValue.powerPlayGoals;
            }
        },
        ppOpp: {
            type: GraphQLInt,
            resolve(parentValue) {
                return parentValue.powerPlayOpportunities;
            }
        },
        faceoffWinPct: {
            type: GraphQLString,
            resolve(parentValue) {
                return parentValue.faceOffWinPercentage;
            }
        },
        blocks: {
            type: GraphQLInt,
            resolve(parentValue) {
                return parentValue.blocked;
            }
        },
        takeaways: {
            type: GraphQLInt,
        },
        giveaways: {
            type: GraphQLInt,
        },
        hits: {
            type: GraphQLInt,
        },
    }
});

const TeamGameStatContainer = new GraphQLObjectType({
    name: 'TeamGameStatContainer',
    fields: {
        team: {
            type: TeamType,
            resolve(parentValue) {
                return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${parentValue.id}`).then(response => response.data.teams[0])
            }
        },
        stats: {
            type: TeamGameStatType,
        },
    }
});

module.exports = TeamGameStatContainer;