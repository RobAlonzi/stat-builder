
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
} = graphql;


const StatusType = new GraphQLObjectType({
    name: 'Status',
    fields: {
        state: {
            type: GraphQLString,
        },
        code: {
            type: GraphQLString,
        },
    }
});

module.exports = StatusType;