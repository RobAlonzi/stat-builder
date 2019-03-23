const axios = require('axios');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLInt } = graphql;

// Custom Types
const PlayType = require('../../Play');

const PlaysType = new GraphQLObjectType({
    name: 'Plays',
    fields: {
        all: {
            type: new GraphQLList(PlayType),
            resolve(parentValue) {
                return parentValue.all;
            }
        },
        scoring: {
            type: new GraphQLList(GraphQLInt),
            resolve(parentValue) {
                return parentValue.scoring;
            }
        },
        penalty: {
            type: new GraphQLList(GraphQLInt),
            resolve(parentValue) {
                return parentValue.penalty;
            }
        },
    }
});

module.exports = PlaysType;