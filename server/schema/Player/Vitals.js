const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} = graphql;

const PlayerVitalsType = new GraphQLObjectType({
    name: 'PlayerVitals',
    fields: {
        dob: {
            type: GraphQLString,
        },
        height: {
            type: GraphQLString,
        },
        weight: {
            type: GraphQLInt,
        },
        birthCity: {
            type: GraphQLString,
        },
        birthStateProvince: {
            type: GraphQLString,
        },
        birthCountry: {
            type: GraphQLString,
        },
        nationality: {
            type: GraphQLString,
        },
        shootsCatches: {
            type: GraphQLString
        }
    },
});

module.exports = PlayerVitalsType;