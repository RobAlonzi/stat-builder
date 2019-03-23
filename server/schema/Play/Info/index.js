const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

// Custom Types
const PeriodType = require('./Period');
const PlayInfoGoalsType = require('./Goals');

const PlayInfoType = new GraphQLObjectType({
    name: 'PlayInfo',
    fields: {
        id: {
            type: GraphQLInt,
        },
        period: {
            type: PeriodType
        },
        goals: {
            type: PlayInfoGoalsType
        }
    }
});

module.exports = PlayInfoType;