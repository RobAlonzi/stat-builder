const graphql = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
} = graphql;

const PlayerType = require('./Player');
const GameType = require('./Game');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        player: {
            type: PlayerType,
            args: { id: { type: GraphQLInt } },
            resolve(parentValue, args) {
                return axios.get(`https://statsapi.web.nhl.com/api/v1/people/${args.id}`).then(response => response.data.people[0])
            }
        },
        game: {
            type: GameType,
            args: { id: { type: GraphQLInt } },
            resolve(parentValue, args) {
                return axios.get(`https://statsapi.web.nhl.com/api/v1/game/${args.id}/feed/live`).then(response => response.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});