const axios = require('axios');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
} = graphql;

const TeamType = require('../../../Team');
const PlayInfoType = require('../../Info');
const GoalResultType = require('./Result');
const PlayInfoPlayersType = require('../../Players');
const CoordinatesType = require('../../Coordinates');

const GoalEventType = new GraphQLObjectType({
    name: 'GoalEvent',
    fields: {
        info: {
            type: PlayInfoType,
            resolve(parentValue) {
                return {
                    id: parentValue.about.eventId,
                    period: {
                        number: parentValue.about.period,
                        ordinal: parentValue.about.ordinalNum,
                        type: parentValue.about.periodType,
                        time: parentValue.about.periodTime,
                        remaining: parentValue.about.periodTimeRemaining,
                        dateTime: parentValue.about.dateTime,
                    },
                    goals: parentValue.about.goals,
                };
            }
        },
        players:{
            type: new GraphQLList(PlayInfoPlayersType),
            resolve(parentValue) {
                return parentValue.players;
            }
        },
        result: {
            type: GoalResultType,
            resolve(parentValue) {
                return {
                    id: parentValue.result.eventTypeId,
                    code: parentValue.result.eventCode,
                    event: parentValue.result.event,
                    description: parentValue.result.description,
                    details: {
                        id: parentValue.result.eventTypeId,
                        shot: parentValue.result.secondaryType,
                        strength: parentValue.result.strength,
                        isGwg: parentValue.result.gameWinningGoal,
                        isEmptyNet: parentValue.result.isEmptyNet,
                    },
                }
            }
        },
        coordinates: {
            type: CoordinatesType,
        },
        team: {
            type: TeamType,
            resolve(parentValue){
                return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${parentValue.team.id}`).then(response => response.data.teams[0])
            }
        },
    },
});

module.exports = GoalEventType;