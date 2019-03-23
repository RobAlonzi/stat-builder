const graphql = require('graphql');
const { GraphQLString } = graphql;

const commonProperties = {
    id: {
        type: GraphQLString,
    },
    code: {
        type: GraphQLString,
    },
    event: {
        type: GraphQLString,
    },
    description: {
        type: GraphQLString,
    },
}

module.exports = commonProperties;