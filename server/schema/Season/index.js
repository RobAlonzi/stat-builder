
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
} = graphql;


const SeasonType = new GraphQLObjectType({
    name: 'Season',
    fields: {
        year: {
            type: GraphQLString,
        },
        type: {
            type: GraphQLString,
        },
    }
});

module.exports = SeasonType;