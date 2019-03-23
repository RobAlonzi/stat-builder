const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

require('./db');
const scrapeGame = require('./scrape');

const app = express();


app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

app.get("/scrape/game/:id", (req, res) => {
	scrapeGame(req.params.id).then(content => {
        res.send(content);
    });
});

app.listen(4000, () => {
    console.log('Listening');
});