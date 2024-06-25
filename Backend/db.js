const knex = require("knex");
const knexfile = require("./knexfile.js"); // Adjust the path as necessary to point to your knexfile

// Initialize knex with the development configuration from knexfile.js
const db = knex(knexfile.development);

module.exports = db;
