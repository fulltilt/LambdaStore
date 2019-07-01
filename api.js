"use strict";

/*
export AWS_PROFILE=[username]
*/
const Api = require("claudia-api-builder");
const api = new Api();

api.get("/pizzas", () => {
  return ["Capricciosa", "Quattro Formaggi", "Napoletana", "Margherita"];
});

module.exports = api;
