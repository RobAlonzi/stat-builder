const axios = require('axios');
const graphql = require('graphql');
const { GraphQLObjectType } = graphql;

const TeamType = require('../../Team');

const TeamsType = new GraphQLObjectType({
    name: 'Teams',
    fields: {
        away: {
            type: TeamType,
            resolve(parentValue){
                return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${parentValue.away}`).then(response => response.data.teams[0])
            }
        },
        home: {
            type: TeamType,
            resolve(parentValue){
                return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${parentValue.home}`).then(response => response.data.teams[0])
            }
        },
    }
});

module.exports = TeamsType;