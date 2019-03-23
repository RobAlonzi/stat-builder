const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} = graphql;

const VenueType = require('../Venue');

const TeamType = new GraphQLObjectType({
    name: 'Team',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        venue: { type: VenueType },
        abbreviation: { type: GraphQLString },
        teamName: { type: GraphQLString },
    }
})

module.exports = TeamType;