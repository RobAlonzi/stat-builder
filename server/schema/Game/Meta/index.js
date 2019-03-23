
const graphql = require('graphql');
const { GraphQLObjectType } = graphql;

const SeasonType = require('../../Season');
const StatusType = require('./Status');
const TimesType = require('./Times');

const MetaType = new GraphQLObjectType({
    name: 'Meta',
    fields: {
        times: {
            type: TimesType,
            resolve(parentValue) {
                return {
                    start: parentValue.dates.dateTime,
                    end: parentValue.dates.endDateTime,
                    isTBD: parentValue.status.startTimeTBD,
                }
            }
        },
        season: {
            type: SeasonType,
            resolve(parentValue) {
                return {
                    year: parentValue.game.season,
                    type: parentValue.game.type,
                }
            }
        },
        status: {
            type: StatusType,
            resolve(parentValue) {
                return {
                    state: parentValue.status.abstractGameState,
                    code: parentValue.status.statusCode,
                     
                }
            }
        },
    }
});

module.exports = MetaType;