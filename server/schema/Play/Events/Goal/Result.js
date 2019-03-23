const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

// Custom Types
const commonResultProps = require('../../Result/Common');
const DetailsType = require('./Details');

const GoalEventResultType = new GraphQLObjectType({
    name: 'GoalEventResult',
    fields: {
        ...commonResultProps,
        details: {
            type: DetailsType,
        }
    }
});

module.exports = GoalEventResultType;