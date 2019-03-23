const graphql = require('graphql');
const { GraphQLUnionType } = graphql;

// Types
const BasicType = require('./Events/Basic');
const BasicResultType = require('./Events/BasicEvent');
const GoalEventType = require('./Events/Goal');
const ShotEventType = require('./Events/Shot');
const PenaltyEventType = require('./Events/Penalty');

const events = ['FACEOFF', 'MISSED_SHOT', 'BLOCKED_SHOT', 'HIT', 'TAKEAWAY', 'GIVEAWAY'];
const types = [BasicType, BasicResultType, PenaltyEventType, GoalEventType, ShotEventType];

const PlayInterface = new GraphQLUnionType({
    name: 'Play',
    types,
    resolveType: (source) => {
        if(events.includes(source.result.eventTypeId)) {
            return BasicResultType;
        }

        if(source.result.eventTypeId === 'GOAL') {
            return GoalEventType;
        }

        if(source.result.eventTypeId === 'SHOT') {
            return ShotEventType;
        }

        if(source.result.eventTypeId === 'PENALTY') {
            return PenaltyEventType;
        }

        return BasicType;
    }
});

module.exports = PlayInterface;

// GAME_SCHEDULED
// PERIOD_READY
// PERIOD_START
// FACEOFF
// SHOT
// STOP
// MISSED_SHOT
// BLOCKED_SHOT
// HIT
// TAKEAWAY
// GIVEAWAY
// PENALTY
// GOAL
// PERIOD_END
// PERIOD_OFFICIAL
// GAME_END