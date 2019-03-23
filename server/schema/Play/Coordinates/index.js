const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt } = graphql;

const CoordinatesType = new GraphQLObjectType({
    name: 'Coordinates',
    fields: {
        x: {
            type: GraphQLInt,
        },
        y: {
            type: GraphQLInt,
        },
    }
});

module.exports = CoordinatesType;