const db = require("../database/dbConfig");

function find() {
  return db("users");
}

function findByUsername(username) {
  return db("users").where({ username }).first();
}

module.exports = { find, findByUsername };
