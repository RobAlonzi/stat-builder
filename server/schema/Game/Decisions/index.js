const axios = require('axios');
const graphql = require('graphql');
const { GraphQLObjectType } = graphql;

// Custom Types
const PlayerType = require('../../Player');

const DecisionsType = new GraphQLObjectType({
    name: 'Decisions',
    fields: {
        winner: {
            type: PlayerType,
            resolve(parentValue) {
                return axios.get(`https://statsapi.web.nhl.com/api/v1/people/${parentValue.winner}`).then(response => response.data.people[0])
            }
        },
        loser: {
            type: PlayerType,
            resolve(parentValue) {
                return axios.get(`https://statsapi.web.nhl.com/api/v1/people/${parentValue.loser}`).then(response => response.data.people[0])
            }
        },
        firstStar: {
            type: PlayerType,
            resolve(parentValue) {
                return axios.get(`https://statsapi.web.nhl.com/api/v1/people/${parentValue.firstStar}`).then(response => response.data.people[0])
            }
        },
        secondStar: {
            type: PlayerType,
            resolve(parentValue) {
                return axios.get(`https://statsapi.web.nhl.com/api/v1/people/${parentValue.secondStar}`).then(response => response.data.people[0])
            }
        },
        thirdStar: {
            type: PlayerType,
            resolve(parentValue) {
                return axios.get(`https://statsapi.web.nhl.com/api/v1/people/${parentValue.thirdStar}`).then(response => response.data.people[0])
            }
        },
    }
});

module.exports = DecisionsType;