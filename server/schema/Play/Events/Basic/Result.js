const graphql = require('graphql');
const { GraphQLObjectType } = graphql;

const commonResultProps = require('../../Result/Common');

const BasicResultType = new GraphQLObjectType({
    name: 'BasicResult',
    fields: {
        ...commonResultProps,
    }
});

module.exports = BasicResultType;