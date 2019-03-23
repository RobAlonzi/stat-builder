const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
} = graphql;

const PositionType = new GraphQLObjectType({
    name: 'Position',
    fields: {
        name: {
            type: GraphQLString,
        },
        code: {
            type: GraphQLString,
        },
        type: {
            type: GraphQLString,
        },
        abbreviation: {
            type: GraphQLString,
        }
    }
});

module.exports = PositionType;