
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean
} = graphql;


const TimesType = new GraphQLObjectType({
    name: 'Times',
    fields: {
        start: {
            type: GraphQLString,
        },
        end: {
            type: GraphQLString,
        },
        isTBD:{
            type: GraphQLBoolean,
        }
    }
});

module.exports = TimesType;