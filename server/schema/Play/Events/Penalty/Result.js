const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

// Custom Types
const commonResultProps = require('../../Result/Common');
const DetailsType = require('./Details');

const PenaltyEventResultType = new GraphQLObjectType({
    name: 'PenaltyEventResult',
    fields: {
        ...commonResultProps,
        details: {
            type: DetailsType,
        }
    }
});

module.exports = PenaltyEventResultType;