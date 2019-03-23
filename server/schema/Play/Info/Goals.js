const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt } = graphql;

// Custom Types
const PlayInfoGoalsType = new GraphQLObjectType({
    name: 'PlayInfoGoalsType',
    fields: {
        away: {
            type: GraphQLInt,
        },
        home: {
            type: GraphQLInt
        }
    }
});

module.exports = PlayInfoGoalsType;