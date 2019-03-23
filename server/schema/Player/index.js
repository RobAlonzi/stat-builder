const graphql = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
} = graphql;

const TeamType = require('../Team');
const PositionType = require('../Position');
const PlayerVitalsType = require('./Vitals');

const PlayerType = new GraphQLObjectType({
    name: 'Player',
    fields: {
        id: {
            type: GraphQLInt,
        },
        active: {
            type: GraphQLBoolean,
        },
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
        number: {
            type: GraphQLString,
            resolve(parentValue) {
                return parentValue.primaryNumber
            }
        },
        position: {
            type: PositionType,
            resolve(parentValue) {
                return parentValue.primaryPosition
            }
        },
        team: {
            type: TeamType,
            resolve(parentValue){
                return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${parentValue.currentTeam.id}`).then(response => response.data.teams[0])
            }
        },
        vitals: {
            type: PlayerVitalsType,
            resolve(parentValue){
                return {
                    dob: parentValue.birthDate,
                    height: parentValue.height,
                    weight: parentValue,weight,
                    birthCity: parentValue.birthCity,
                    birthStateProvince: parentValue.birthStateProvince,
                    birthCountry: parentValue.birthCountry,
                    nationality: parentValue.nationality,
                    shootsCatches: parentValue.shootsCatches,
                }
            }
        }
    },
});

module.exports = PlayerType;