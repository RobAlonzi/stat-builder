const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

// Custom Types
const PeriodType = new GraphQLObjectType({
    name: 'PeriodType',
    fields: {
        number: {
            type: GraphQLInt,
        },
        ordinal: {
            type: GraphQLString
        },
        type: {
            type: GraphQLString
        },
        time: {
            type: GraphQLString
        },
        remaining: {
            type: GraphQLString
        },
        dateTime: {
            type: GraphQLString
        },
    }
});

module.exports = PeriodType;