
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
} = graphql;

const PositionType = require('../Position');

const CoachType = new GraphQLObjectType({
    name: 'Coach',
    fields: {
        name: {
            type: GraphQLString,
            resolve(parentValue){
                return parentValue.person.fullName
            }
        },
        position: {
            type: PositionType,
        }
    }
});

module.exports = CoachType;