const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = graphql;

const StrengthType = require('./Strength');

const GoalEventResultDetailsType = new GraphQLObjectType({
    name: 'GoalEventResultDetails',
    fields: {
        id: {
            type: GraphQLString
        }, 
        shot: {
            type: GraphQLString,
        },
        isGwg: {
            type: GraphQLBoolean,
        },
        isEmptyNet: {
            type: GraphQLBoolean,
        },
        strength: {
            type: StrengthType,
            resolve(parentValue){
                return {
                    id: parentValue.strength.code,
                    name: parentValue.strength.name
                }
            }
        }
    }
});

module.exports = GoalEventResultDetailsType;