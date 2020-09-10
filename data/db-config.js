const knex = require("knex");
const config = require("../knexfile");

module.exports = knex(config.development);

/*
Connection.js example

const knex = require("knex");

const knexfile = require("../knexfile");

const environment = process.env.NODE_ENV || "development";

const config = knexfile[environment];

module.exports = knex(config);

*/