
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = graphql;


const OfficialType = new GraphQLObjectType({
    name: 'Official',
    fields: {
        id: {
            type: GraphQLInt,
        },
        name: {
            type: GraphQLString,
            resolve(parentValue){
                return parentValue.fullName
            }
        },
        type: {
            type: GraphQLString,
        }
    }
});

module.exports = OfficialType;