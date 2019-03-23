const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const GoalStrengthType = new GraphQLObjectType({
    name: 'GoalStrength',
    fields: {
        id: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
        },
    }
});

module.exports = GoalStrengthType;