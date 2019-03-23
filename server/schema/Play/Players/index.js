const axios = require('axios');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

// Custom Types
const PlayerType = require('../../Player');

const PlayInfoPlayersType = new GraphQLObjectType({
    name: 'PlayInfoPlayersType',
    fields: {
        player: {
            type: PlayerType,
            resolve(parentValue) {
                return axios.get(`https://statsapi.web.nhl.com/api/v1/people/${parentValue.player.id}`).then(response => response.data.people[0])
            }
        },
        type: {
            type: GraphQLString,
            resolve(parentValue){
                return parentValue.playerType;
            }
        }
    }
});

module.exports = PlayInfoPlayersType;