const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList } = graphql;

// Custom Types
const CoachType = require('../../Coach');

const GameCoachesContainer = new GraphQLObjectType({
    name: 'GameCoachesContainerType',
    fields: {
        away: {
            type: new GraphQLList(CoachType),
        },
        home: {
            type: new GraphQLList(CoachType),
        },
    }
});

module.exports = GameCoachesContainer;