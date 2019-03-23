const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} = graphql;

const VenueType = new GraphQLObjectType({
    name: 'Venue',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        city: { type: GraphQLString }
    }
})


module.exports = VenueType;