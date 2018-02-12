const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const graphql = require('graphql').graphql;
const graphQLHTTP = require('express-graphql') 
const Schema = require('./graphql/schema');

const mongoConn = require('./mongoConnection')();

let app = express();

// Setup bodyParsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mount the static asset
app.use(express.static(path.join(__dirname, 'public')));

// Mount the APIs specific to version
app.use(require('./api/v1'));

// This is just an internal test
var query = 'query { products(vendor:"Samsung") { sku, status } }'

graphql(Schema, query).then(function (result) {
    console.log(JSON.stringify(result, null, " "));

});

app.use('/graphql', graphQLHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}));

module.exports = app;