const graphql = require('graphql');
const { GraphQLObjectType } = graphql;

const commonResultProps = require('../../Result/Common');

const BasicEventResultType = new GraphQLObjectType({
    name: 'BasicEventResult',
    fields: {
        ...commonResultProps
    }
});

module.exports = BasicEventResultType;