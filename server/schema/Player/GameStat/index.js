
const graphql = require('graphql');
const { GraphQLUnionType } = graphql;

const SkaterGameStatContainer = require('./Skater');
const GoalieGameStat = require('./Goalie');
const types = [SkaterGameStatContainer, GoalieGameStat];

const GameStatType = new GraphQLUnionType({
    name: 'GameStat',
    types,
    resolveType: (source) => {

        if(source.stats.goalieStats){
            return GoalieGameStat;
        }

        return SkaterGameStatContainer;
    }
});

module.exports = GameStatType;