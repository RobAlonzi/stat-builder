const axios = require('axios');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const OfficialType = require('../../Official');

const OfficialsType = new GraphQLObjectType({
    name: 'Officials',
    fields: {
        official: {
            type: OfficialType,
            resolve(parentValue){
                return parentValue.official;
            }
        },
        type: {
            type: GraphQLString,
            resolve(parentValue){
                return parentValue.officialType;
            }
        },
    }
});

module.exports = OfficialsType;