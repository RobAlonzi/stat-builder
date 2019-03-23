const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;


const PenaltyEventResultDetailsType = new GraphQLObjectType({
    name: 'PenaltyEventResultDetails',
    fields: {
        id: {
            type: GraphQLString
        }, 
        penalty: {
            type: GraphQLString,
        },
        minutes: {
            type: GraphQLString,
        },
        severity: {
            type: GraphQLString,
        },
    }
});

module.exports = PenaltyEventResultDetailsType;