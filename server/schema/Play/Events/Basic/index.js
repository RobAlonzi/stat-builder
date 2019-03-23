const graphql = require('graphql');
const {
    GraphQLObjectType,
} = graphql;

const PlayInfoType = require('../../Info');
const PlayResultType = require('./Result');

const BasicType = new GraphQLObjectType({
    name: 'Basic',
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
        result: {
            type: PlayResultType,
            resolve(parentValue) {
                return {
                    id: parentValue.result.eventTypeId,
                    code: parentValue.result.eventCode,
                    event: parentValue.result.event,
                    description: parentValue.result.description,
                }
            }
        },
    },
});

module.exports = BasicType;